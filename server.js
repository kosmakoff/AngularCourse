var express = require('express');
var app = express();
var url = require('url');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds040898.mongolab.com:40898/angular-course');

var Employee = require('./app/models/employee');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var apiRouter = express.Router();

apiRouter.route('/employees')
    .get(function (req, res) {
        var urlParts = url.parse(req.url, true);
        var query = urlParts.query.q;
        var skip = urlParts.query.skip || 0;
        var take = urlParts.query.take || 10;

        var mongoQuery = {};

        if (query) {
            mongoQuery = {
                $or: [
                    {
                        name: new RegExp(query, 'i')
                    }, {
                        grade: new RegExp(query, 'i')
                    }, {
                        job: new RegExp(query, 'i')
                    }
                ]
            };
        }

        var queryObject = Employee
            .find(mongoQuery)
            .sort({ _id: 1 })
            .skip(skip)
            .limit(take);

        queryObject.exec(function (err, employees) {
            if (err) {
                res.send(err);
                return;
            }
            
            Employee.count(mongoQuery, function (err, count) {
                if (err) {
                    res.send(err);
                    return;
                }
                
                res.setHeader('X-Total-Count', count);
                res.setHeader('X-Page-Size', take);

                res.json(employees);
            });
        });
    });

apiRouter.route('/employees/:emp_id')
    .get(function (req, res) {
        Employee.findById(req.params.emp_id, function (err, employee) {
            if (err) {
                res.send(err);
                return;
            }

            if (!employee) {
                res.send(404);
                return;
            }
            
            res.json(employee);
        });
    });

app.use(express.static(__dirname + '/build'));

app.use('/api', apiRouter);

app.listen(port);
console.log('Magic happens on port ' + port);
