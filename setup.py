from setuptools import setup, find_packages

setup(
    name='mpc_api',
    version='0.0.1',
    author='Alexander Wilde',
    author_email='alexander.wilde87@gmail.com',
    packages=find_packages(exclude=('tests', 'docs'))
)