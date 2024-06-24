import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('stock-quotes')
print(table.creation_date_time)

table.put_item(
   Item={
        'stock_id': 'Bitcoin',
        'date': '25-06-2023',
        'currency': 'USD',
        'value': Decimal('30450.30')
    }
)