from flask import Blueprint, request, jsonify
from .extensions import db
from .models import User, Transaction, Category
import jwt
from datetime import datetime, timedelta
from flask import current_app

api_bp = Blueprint('api', __name__)

@api_bp.route('/')
def index():
    return {'message': 'Welcome to the Zenith API'}

from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

from datetime import datetime, date

from datetime import timedelta

@api_bp.route('/reports/income-expense-summary', methods=['GET'])
@token_required
def get_income_expense_summary(current_user):
    today = date.today()
    twelve_months_ago = today.replace(year=today.year - 1)

    income_summary = db.session.query(
        db.func.sum(Transaction.amount),
        db.func.strftime('%Y-%m', Transaction.date)
    ).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == 'income',
        Transaction.date >= twelve_months_ago
    ).group_by(db.func.strftime('%Y-%m', Transaction.date)).all()

    expense_summary = db.session.query(
        db.func.sum(Transaction.amount),
        db.func.strftime('%Y-%m', Transaction.date)
    ).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == 'expense',
        Transaction.date >= twelve_months_ago
    ).group_by(db.func.strftime('%Y-%m', Transaction.date)).all()

    summary_data = {}
    for amount, month in income_summary:
        if month not in summary_data:
            summary_data[month] = {'month': month, 'income': 0, 'expense': 0}
        summary_data[month]['income'] = amount

    for amount, month in expense_summary:
        if month not in summary_data:
            summary_data[month] = {'month': month, 'income': 0, 'expense': 0}
        summary_data[month]['expense'] = amount

    return jsonify(list(summary_data.values()))

@api_bp.route('/reports/expense-breakdown', methods=['GET'])
@token_required
def get_expense_breakdown(current_user):
    query = db.session.query(
        Category.name,
        db.func.sum(Transaction.amount)
    ).join(Transaction, Category.id == Transaction.category_id).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == 'expense'
    )

    startDate = request.args.get('startDate')
    if startDate:
        query = query.filter(Transaction.date >= datetime.strptime(startDate, '%Y-%m-%d').date())

    endDate = request.args.get('endDate')
    if endDate:
        query = query.filter(Transaction.date <= datetime.strptime(endDate, '%Y-%m-%d').date())

    breakdown = query.group_by(Category.name).all()

    output = []
    for name, total in breakdown:
        output.append({'name': name, 'value': total})

    return jsonify(output)

@api_bp.route('/dashboard/recent-transactions', methods=['GET'])
@token_required
def get_recent_transactions(current_user):
    recent_transactions = Transaction.query.filter_by(user_id=current_user.id).order_by(Transaction.date.desc()).limit(5).all()
    output = []
    for transaction in recent_transactions:
        transaction_data = {}
        transaction_data['id'] = transaction.id
        transaction_data['type'] = transaction.type
        transaction_data['amount'] = transaction.amount
        transaction_data['date'] = transaction.date.strftime('%Y-%m-%d')
        transaction_data['category_id'] = transaction.category_id
        transaction_data['description'] = transaction.description
        output.append(transaction_data)
    return jsonify({'transactions': output})

@api_bp.route('/dashboard/chart', methods=['GET'])
@token_required
def get_dashboard_chart(current_user):
    today = date.today()
    thirty_days_ago = today - timedelta(days=30)

    income_data = db.session.query(
        db.func.sum(Transaction.amount),
        db.func.date(Transaction.date)
    ).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == 'income',
        Transaction.date >= thirty_days_ago
    ).group_by(db.func.date(Transaction.date)).all()

    expense_data = db.session.query(
        db.func.sum(Transaction.amount),
        db.func.date(Transaction.date)
    ).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == 'expense',
        Transaction.date >= thirty_days_ago
    ).group_by(db.func.date(Transaction.date)).all()

    chart_data = {}
    for amount, day in income_data:
        day_str = day.strftime('%Y-%m-%d')
        if day_str not in chart_data:
            chart_data[day_str] = {'date': day_str, 'income': 0, 'expense': 0}
        chart_data[day_str]['income'] = amount

    for amount, day in expense_data:
        day_str = day.strftime('%Y-%m-%d')
        if day_str not in chart_data:
            chart_data[day_str] = {'date': day_str, 'income': 0, 'expense': 0}
        chart_data[day_str]['expense'] = amount

    return jsonify(list(chart_data.values()))

@api_bp.route('/dashboard/metrics', methods=['GET'])
@token_required
def get_dashboard_metrics(current_user):
    today = date.today()
    start_of_month = today.replace(day=1)

    total_income = db.session.query(db.func.sum(Transaction.amount)).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == 'income',
        Transaction.date >= start_of_month
    ).scalar() or 0

    total_expenses = db.session.query(db.func.sum(Transaction.amount)).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == 'expense',
        Transaction.date >= start_of_month
    ).scalar() or 0

    net_balance = total_income - total_expenses

    return jsonify({
        'total_income': total_income,
        'total_expenses': total_expenses,
        'net_balance': net_balance
    })

@api_bp.route('/categories', methods=['POST'])
@token_required
def create_category(current_user):
    data = request.get_json()
    new_category = Category(user_id=current_user.id, name=data['name'])
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'message': 'Category created'}), 201

@api_bp.route('/categories', methods=['GET'])
@token_required
def get_categories(current_user):
    categories = Category.query.filter_by(user_id=current_user.id).all()
    output = []
    for category in categories:
        category_data = {}
        category_data['id'] = category.id
        category_data['name'] = category.name
        output.append(category_data)
    return jsonify({'categories': output})

@api_bp.route('/categories/<category_id>', methods=['PUT'])
@token_required
def update_category(current_user, category_id):
    category = Category.query.filter_by(id=category_id, user_id=current_user.id).first()
    if not category:
        return jsonify({'message': 'Category not found'}), 404
    data = request.get_json()
    category.name = data.get('name', category.name)
    db.session.commit()
    return jsonify({'message': 'Category updated'})

@api_bp.route('/categories/<category_id>', methods=['DELETE'])
@token_required
def delete_category(current_user, category_id):
    category = Category.query.filter_by(id=category_id, user_id=current_user.id).first()
    if not category:
        return jsonify({'message': 'Category not found'}), 404
    # Re-categorize transactions to "Uncategorized" or prevent deletion.
    # For now, we will just delete the category
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Category deleted'})

@api_bp.route('/transactions', methods=['POST'])
@token_required
def create_transaction(current_user):
    data = request.get_json()
    new_transaction = Transaction(
        user_id=current_user.id,
        type=data['type'],
        amount=data['amount'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        category_id=data['category_id'],
        description=data.get('description')
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({'message': 'Transaction created'}), 201

@api_bp.route('/transactions', methods=['GET'])
@token_required
def get_transactions(current_user):
    query = Transaction.query.filter_by(user_id=current_user.id)

    type = request.args.get('type')
    if type:
        query = query.filter(Transaction.type == type)

    startDate = request.args.get('startDate')
    if startDate:
        query = query.filter(Transaction.date >= datetime.strptime(startDate, '%Y-%m-%d').date())

    endDate = request.args.get('endDate')
    if endDate:
        query = query.filter(Transaction.date <= datetime.strptime(endDate, '%Y-%m-%d').date())

    transactions = query.all()
    output = []
    for transaction in transactions:
        transaction_data = {}
        transaction_data['id'] = transaction.id
        transaction_data['type'] = transaction.type
        transaction_data['amount'] = transaction.amount
        transaction_data['date'] = transaction.date.strftime('%Y-%m-%d')
        transaction_data['category_id'] = transaction.category_id
        transaction_data['description'] = transaction.description
        output.append(transaction_data)
    return jsonify({'transactions': output})

@api_bp.route('/transactions/<transaction_id>', methods=['PUT'])
@token_required
def update_transaction(current_user, transaction_id):
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=current_user.id).first()
    if not transaction:
        return jsonify({'message': 'Transaction not found'}), 404
    data = request.get_json()
    transaction.type = data.get('type', transaction.type)
    transaction.amount = data.get('amount', transaction.amount)
    transaction.date = datetime.strptime(data['date'], '%Y-%m-%d').date() if data.get('date') else transaction.date
    transaction.category_id = data.get('category_id', transaction.category_id)
    transaction.description = data.get('description', transaction.description)
    db.session.commit()
    return jsonify({'message': 'Transaction updated'})

@api_bp.route('/transactions/<transaction_id>', methods=['DELETE'])
@token_required
def delete_transaction(current_user, transaction_id):
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=current_user.id).first()
    if not transaction:
        return jsonify({'message': 'Transaction not found'}), 404
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({'message': 'Transaction deleted'})

@api_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if user is None or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, current_app.config['SECRET_KEY'])

    return jsonify({'token': token})

@api_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 400

    user = User(email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()  # Commit to get user.id

    # Create default categories for the new user
    default_categories = ['Salary', 'Rent', 'Groceries', 'Transport', 'Entertainment']
    for category_name in default_categories:
        new_category = Category(user_id=user.id, name=category_name)
        db.session.add(new_category)
    db.session.commit()

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, current_app.config['SECRET_KEY'])

    return jsonify({'token': token}), 201
