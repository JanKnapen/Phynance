from .definitions import BANK_ACCOUNT_INFO_KEYS
from .models import BankTransaction


def get_balance(bank_account, user):
    last_transaction = BankTransaction.objects.filter(bank_account__owner=user.id)\
        .filter(bank_account__id=bank_account['id'])\
        .order_by('-serial_number')\
        .first()
    balance = last_transaction.balance_after if last_transaction else 0
    return balance


def select_info(bank_account, user):
    info = {info_key: bank_account[info_key] for info_key in BANK_ACCOUNT_INFO_KEYS}
    info['balance'] = get_balance(bank_account, user)
    return info
