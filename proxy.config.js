//pra resolver a tranqueira do problema de cors fiz isso abaixo conforme aqui: https://www.redspark.io/resolvendo-o-problema-do-cors-com-angular-e-angularcli/

const proxy = [
{
    context: '/api',
    target: 'http://localhost:5550',
    pathRewrite: {'^/api' : ''}
}
];
module.exports = proxy;