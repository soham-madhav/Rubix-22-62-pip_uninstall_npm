# Generated by Django 3.2.8 on 2022-01-20 09:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashapp', '0008_auto_20220120_0320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reminder',
            name='reminderTimeStamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 20, 9, 17, 22, 429726)),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='transactionTimeStamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 1, 20, 9, 17, 22, 428725)),
        ),
        migrations.AlterField(
            model_name='userfraudadvisor',
            name='lastTransactionTS',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 20, 9, 17, 22, 429726)),
        ),
    ]
