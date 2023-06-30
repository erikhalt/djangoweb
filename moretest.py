import datetime

curr_date = datetime.datetime.now()
comingdays = []

for i in range(8):
    curr_date += datetime.timedelta(days=1)
    comingdays.append(curr_date.strftime('%Y-%m-%d'))

print(comingdays)