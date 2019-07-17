FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
    cron \
    postfix \
    curl

COPY ./crontab /etc/cron.d/cron-interval

RUN chmod 644 /etc/cron.d/cron-interval

CMD service cron start