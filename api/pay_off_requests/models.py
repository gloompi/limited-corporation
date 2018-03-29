from django.db import models
from take_access.models import CustomUser

# Create your models here.
class PayOffModel(models.Model):
    AGREGATOR_TYPES = (
        ('QW', 'Qiwi Кошелек'),
        ('BC', 'Банковская карта'),
        ('YM', 'Яндекс Деньги'),
        ('PP', 'Paypal Кошелек'),
        ('CW', 'Крипто Кошелек'),
    )
    PAYED = True
    UNPAYED = False

    TYPES = (
        (PAYED, 'Оплачен'),
        (UNPAYED, 'Не оплачен'),
    )

    amount = models.IntegerField(default=0, verbose_name='Сумма')
    wallet = models.CharField(max_length=50, default='', verbose_name='Номер Карты/Кошелька')
    date_added = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')
    agregator = models.CharField(max_length=2, default="QW", choices=AGREGATOR_TYPES, verbose_name='Платежная система')
    comment = models.CharField(max_length=50, default='', verbose_name='Коментарий')
    status = models.BooleanField(max_length=10, default=UNPAYED, choices=TYPES, verbose_name='Статус')
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.PROTECT,
        null=True,
        related_name='payoff_related_user',
        verbose_name='Пользователь'
    )

    class Meta:
        ordering = ['-date_added']
        verbose_name = 'Заявка на выплату'
        verbose_name_plural = 'Заявки на выплату'

    def __str__(self):
        return str(self.amount)

    def is_request_success(self):
        return self.status

    is_request_success.admin_order_field = 'status'
    is_request_success.boolean = True
    is_request_success.short_description = 'payment status'