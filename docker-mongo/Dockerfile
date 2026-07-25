FROM mongo:3.6.3

# Expõe a porta padrão do MongoDB
EXPOSE 27017

# Copia os arquivos para dentro do container
ADD run.sh /run.sh
ADD ./files/mongod.conf /etc/mongod.conf

# Garante permissão de execução para o script
RUN chmod +x /run.sh

# Comando padrão do container
CMD ["/run.sh"]
