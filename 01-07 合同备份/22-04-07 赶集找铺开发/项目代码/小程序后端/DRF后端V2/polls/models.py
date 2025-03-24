from venv import create
from anyio import create_capacity_limiter
from django.db import models

class recommentUser(models.Model):
    id=models.AutoField(primary_key=True)
    user_name=models.CharField(max_length=64)
    user_phone=models.CharField(max_length=64)

    class Meta:
        db_table = 'polls_recomment_user'
        verbose_name = '推荐人'
        verbose_name_plural = '推荐人'
    def __str__(self):
        return self.user_name