module.exports = (err, req, res, next) => {
    // console.log(err.message,'$$$$$$$$$$$$$$$$$$$$$$$$$$');
    let status = err.status || 500;
    let errors = [err.message] || ["internal server error"];
    // console.log(errors,'@@@@@@@@@@');
    switch (err.name) {
        case "SequelizeValidationError":
            status = 400;
            let messages = [];
            err.errors.forEach((error) => {
                messages.push(error.message);
            });
            // console.log(messages,'<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            // console.log(status,'<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            errors = messages;
            break;
        case "SequelizeUniqueConstraintError":
            errors = ["Email already registered"];
            status = 400;
            break;
        default:
            status = err.status || 500;
            errors = [err.message] || ["internal server error"];
            break;
    }
    // console.log(status,errors,'$$$$$$$$$$$$$$$$$$$$$$$$$$');
    res.status(status).json({ errors });
};
