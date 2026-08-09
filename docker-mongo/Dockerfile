FROM mongo:4.4.29

EXPOSE 27017

ADD run.sh /run.sh

ADD ./files/mongod.conf /etc/mongod.conf

RUN chmod +x /run.sh

CMD ["/run.sh"]
