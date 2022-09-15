from .definitions import BANK_ACCOUNT_INFO_KEYS
from .models import BankTransaction


def select_info(bank_account, user):
    last_transaction = BankTransaction.objects.filter(bank_account__owner=user.id)\
        .order_by('-serial_number')\
        .first()
    info = {info_key: bank_account[info_key] for info_key in BANK_ACCOUNT_INFO_KEYS}
    info['balance'] = last_transaction.balance_after if last_transaction else 0
    return info
