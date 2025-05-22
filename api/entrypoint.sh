echo "Aguardando o MySQL ficar disponível..."

while ! nc -z mysql 3306; do
  echo "MySQL ainda não está disponível. Aguardando..."
  sleep 2
done

echo "MySQL está online. Iniciando a API..."
npm run dev
