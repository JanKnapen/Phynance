from datetime import datetime

from django.db.models import Sum

from .definitions import BANK_ACCOUNT_INFO_KEYS
from .models import BankTransaction


def get_balance(bank_account, user):
    last_transaction = BankTransaction.objects.filter(bank_account__owner=user.id)\
        .filter(bank_account__id=bank_account['id'])\
        .order_by('-serial_number')\
        .first()
    balance = last_transaction.balance_after if last_transaction else 0
    return balance


def get_expenses(transactions):
    expense_transactions = transactions.filter(amount__lt=0)
    total_expenses = expense_transactions.aggregate(Sum('amount'))['amount__sum']
    if total_expenses is None:
        total_expenses = 0
    return -round(total_expenses, 2)


def get_income(transactions):
    income_transactions = transactions.filter(amount__gt=0)
    total_income = income_transactions.aggregate(Sum('amount'))['amount__sum']
    if total_income is None:
        total_income = 0
    return round(total_income, 2)


def get_month_and_year_transaction(bank_account):
    current_month = datetime.now().month
    current_year = datetime.now().year

    month_transactions = BankTransaction.objects.filter(bank_account__id=bank_account['id'])\
        .filter(date__month=current_month)
    year_transactions = BankTransaction.objects.filter(bank_account__id=bank_account['id'])\
        .filter(date__year=current_year)

    return month_transactions, year_transactions


def get_transactions_by_date_range(bank_account, start_date, end_date):
    transactions = BankTransaction.objects.filter(bank_account__id=bank_account['id'])\
        .filter(date__gte=start_date)\
        .filter(date__lte=end_date)
    return transactions


def get_expenses_and_income(bank_account):
    month_transactions, year_transactions = get_month_and_year_transaction(bank_account)

    expenses = {
        'month': get_expenses(month_transactions),
        'year': get_expenses(year_transactions),
    }
    income = {
        'month': get_income(month_transactions),
        'year': get_income(year_transactions),
    }
    return expenses, income


def select_info(bank_account, user):
    info = {info_key: bank_account[info_key] for info_key in BANK_ACCOUNT_INFO_KEYS}
    info['balance'] = get_balance(bank_account, user)
    return info


def transaction_exists(transaction):
    existing_transaction = BankTransaction.objects.filter(bank_account=transaction['bank_account'])\
        .filter(serial_number=transaction['serial_number'])\
        .first()
    return existing_transaction is not None


def suggest_category(transaction):
    transaction['category'] = None
    return transaction


def get_transactions_by_period(bank_account, period, date_range):
    if period in ['month', 'year']:
        month_transactions, year_transactions = get_month_and_year_transaction(bank_account)
        return month_transactions.values() if period == 'month' else year_transactions.values()
    if period == 'custom':
        start_date = datetime.strptime(date_range['startDate'], '%Y/%m/%d').date()
        end_date = datetime.strptime(date_range['endDate'], '%Y/%m/%d').date()
        transactions = get_transactions_by_date_range(bank_account, start_date, end_date)
        return transactions.values()
    return []
