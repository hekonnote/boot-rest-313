$(document).ready(function () {

    insertNewUserTab_html();

});

function insertNewUserTab_html() {

    let newUserTab_html = `
                <!-- HTML вкладки New user начало-->
                <div class="tab-pane fade" id="new" role="tabpanel" aria-labelledby="new-tab">
                    <h5 class="d-flex ml-3 mt-1">Add new user</h5>
                    <div class="container-fluid bg-white px-5 py-3 vh-100 text-center">
                
                        <div class="row">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-6">
                
                                <form id="add-new-user-form">
                
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="name">Name</label>
                                        <input type="text"
                                               name="name"
                                               class="form-control bg-warning"
                                               id="name"
                                               placeholder="Name"
                                               required>
                                    </div>
                
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="age">Age</label>
                                        <input required
                                               type="text"
                                               name="age"
                                               class="form-control bg-warning"
                                               id="age"
                                               placeholder="Age">
                                    </div>
                
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="password">Password</label>
                                        <input type="password"
                                               class="form-control"
                                               name="password"
                                               id="password"
                                               placeholder="Password"
                                               required>
                                    </div>
                
                                    <div class="form-group">
                                        <label class="font-weight-bold" for="roles">Roles</label>
                                        <select multiple size="2" class="form-control" id="roles"
                                                name="rolesNames" required>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <button id='button-create-user' class='btn btn-success'>Add new user</button>
                                    </div>
                                    
                                </form>
                                
                                    
<!--                                        <button id='button-create-user' class='btn btn-success'>Add new user</button>-->
                                
                            </div>
                            <div class="col-sm-3"></div>
                        </div>
                    </div>
                
                </div>
                <!--HTML вкладки New user конец-->
`;
    // Добавляем HTML вкладки New user в Базовый HTML
    $("#myTabContent").append(newUserTab_html);

    getRolesList();

    //  Получение данных формы ============================== начало
    const submit = document.getElementById("button-create-user");

    // Генерим userData для последующего преобразования ее в json
    const getUserDataFromForm = () => {
        const form = document.getElementById("add-new-user-form");

        const {name, age, password, roles} = form;

        let rolesArr = [];

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].selected) {
                rolesArr.push(roles[i].value);
            }
        }

        let userData = {
            name: name.value,
            age: age.value,
            password: password.value,
            rolesNames: rolesArr
        };

        return userData;
    };

    const toJson = function (event) {
        const user = getUserDataFromForm();

        event.preventDefault();

        let json = JSON.stringify(user);

        console.log(json);

        // отправка данных формы в API
        $.ajax({
            url: "/api/admin/users",
            type: "POST",
            contentType: 'application/json',
            data: json,
            success: function (result) {
                // юзер был создан, вернуться к списку юзеров
                showAdminPanel();
                insertNewUserTab_html();
            },
            error: function (xhr, resp, text) {
                // вывести ошибку в консоль
                console.log(xhr, resp, text);
            }
        });
    };
//  Получение данных формы ============================== конец
    submit.addEventListener('click', toJson);
};

// Получение списка ролей и добавление их в форму для нового юзера ================ начало
function getRolesList() {

    let options_html = '';

    $.getJSON("/api/users/new", function (blankUser) {
        console.log('Add rolesList to New user form ============ ');
        for (let i = 0; i < blankUser.roles.length; i++) {
            options_html += `<option>${blankUser.roles[i].role}</option>`;
        }
        console.log(options_html);
        $("#roles").append(options_html);
    });
}

// Получение списка ролей и добавление их в форму для нового юзера ================ конец

// будет работать, если создана форма для создания нового юзера
// $(document).on('click', '#button-create-user', function(){
// получение данных из формы
// let form_data=JSON.stringify($(this).serializeObject());
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
//     return false;
// });
