# python setup
echo "creating venv ..."
python -m venv .venv
source .venv/bin/activate
python -m pip install -U .
echo "python setup complete."

# js setup

echo "installing bot dependencies"
yarn install


echo "installed all dependencies"

