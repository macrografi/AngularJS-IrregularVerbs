angularApp.factory("DataService", function () {

    var getJson = function () {
        return {

        }
    }

    //var getEmployee = function () {
    //    return {
    //        fullName: "Cenk Özkan",
    //        notes: "Lorem ipsum dolor sit amet concectuer adipiscing elid...",
    //        department: "Lorem Ipum Dolor 01",
    //        dateHired: "July 11 2014",
    //        templateCheckbox1: true,
    //        templateCheckbox2: false,
    //        templateCheckbox3: true,
    //        templateRadio: ""
    //    }
    //}

    return {
        getEmployee: getEmployee
    }
});
