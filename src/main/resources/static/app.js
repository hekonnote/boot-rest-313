jQuery(function ($) {       // $(document).ready(function(){

    console.log('Start app 313 (app.js) =============');
    // Базовое HTML приложения

    var app_html = `
                        
            <!-- здесь будет показано содержимое navbar-->
            <div id='navbar-content'></div>
            
            <!-- здесь будет показано содержимое приложения-->
            <div id='page-content'></div>
        `;

    // вызов функции navbarFilling()
    navbarFilling();

    // вставка кода на страницу
    $("#app").html(app_html);

});

// Function navbarFilling() начало ------------------------------------------------
function navbarFilling() {
    console.log('Function navbarFilling() app.js ===============');
    $.getJSON("/api/user/", function (data) {
        let rolesArr = [];
        for (let i = 0; i < data.roles.length; i++) {
            rolesArr.push(data.roles[i].role);
        }
        let rolesList = rolesArr.join(', ');

        let navbar_html = `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                    <span>
                        <span class="navbar-brand font-weight-bold">${data.name}</span>
                        <span class="navbar-brand font-weight-regular">with roles: ${rolesList}</span>

                    </span>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <small><a class="nav-link" href="/logout">Logout</a></small>
                        </li>
                    </ul>
                </nav>`;

        // вставка в 'navbar-content'
        $("#navbar-content").html(navbar_html);
    });
}
// Function navbarFilling() конец ----------------------------------------------



// const submit = document.getElementById("button-create-user");
//
// const getFormData = () => {
//     const form = document.getElementById("add-new-user-form");
//     return new FormData(form);
// };
//
// const toJson = function (event) {
//     const formData = getFormData();
//     event.preventDefault();
//     let object = {};
//     formData.forEach((value, key) => {
//         if (!Reflect.has(object, key)) {
//             object[key] = value;
//             return;
//         }
//         if (!Array.isArray(object[key])) {
//             object[key] = [object[key]];
//         }
//         object[key].push(value);
//     });
//     let json = JSON.stringify(object);
//     console.log(json);
//     // отправка данных формы в API
//     $.ajax({
//         url: "/api/admin/users",
//         type: "POST",
//         contentType: 'application/json',
//         data: json,
//         success: function (result) {
//             // юзер был создан, вернуться к списку юзеров
//             showAdminPanel();
//             readUsers()
//             $("#myTabContent").append(newUserTab_html);
//             $("#roles").append(options_html);
//         },
//         error: function (xhr, resp, text) {
//             // вывести ошибку в консоль
//             console.log(xhr, resp, text);
//         }
//     });
// };
//
// submit.addEventListener('click', toJson);

// получение данных из формы
// let form_data=JSON.stringify(toJson);
// let form_data=JSON.stringify(Object.fromEntries(formData.entries()));

// отправка данных формы в API
// $.ajax({
//     url: "/api/admin/users",
//     type : "POST",
//     contentType : 'application/json',
//     data : form_data,
//     success : function(result) {
//         // юзер был создан, вернуться к списку юзеров
//         showAdminPanel();
//         readUsers()
//         $("#myTabContent").append(newUserTab_html);
//         $("#roles").append(options_html);
//     },
//     error: function(xhr, resp, text) {
//         // вывести ошибку в консоль
//         console.log(xhr, resp, text);
//     }
// });


// функция создания значений формы в формате json 2
// $.fn.serializeObject = function () {
//     let formData = new FormData(form);
//     let object = {};
//     formData.forEach((value, key) => {
//
//         console.log("мир сошел с ума");
//         // Reflect.has in favor of: object.hasOwnProperty(key)
//         if (!Reflect.has(object, key)) {
//             object[key] = value;
//             return;
//         }
//         if (!Array.isArray(object[key])) {
//             object[key] = [object[key]];
//         }
//         object[key].push(value);
//     });
//     return object;
// };


