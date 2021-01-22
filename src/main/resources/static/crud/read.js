// jQuery(function ($) {
$(document).ready(function () {

    // Служебная строка
    console.log('Start read.js =============')

    showAdminPanel();

    readUsers();

    // Ручной вызов функции readUsers() с помощью нажатия кнопки
    $(document).on('click', '.read-users-button', function () {
        readUsers();
    });
});

// function showAdminPanel() выводит страницу Admin panel НАЧАЛО
function showAdminPanel() {

// // html for listing Users
//         let read_users_html = `
//     <!-- при нажатии загружается форма создания нового юзера -->
//     <div id='create-user' class='btn btn-primary pull-right m-b-15px create-user-button'>
//         <span class='glyphicon glyphicon-plus'></span> New user
//     </div>
//
//             <!-- начало таблицы -->
//         <table class='table table-bordered table-hover'>
//
//             <!-- создание заголовков таблицы -->
//         <tr>
//         <th class='w-15-pct'>Name</th>
//             <th class='w-10-pct'>Age</th>
//             <th class='w-15-pct'>Roles</th>
//             <th class='w-25-pct text-align-center'>Actions</th>
//             </tr>`;
//
//         // здесь будут строки
//         // перебор списка возвращаемых данных
//         $.each(data, function (key, val) {
//
//             // создание новой строки таблицы для каждой записи
//             read_users_html += `
//         <tr>
//
//             <td>` + val.name + `</td>
//             <td>` + val.age + `</td>
//             <td>` + val.roles + `</td>
//
//             <!-- кнопки 'действий' -->
//             <td>
//                 <!-- кнопка чтения товара -->
//                 <button class='btn btn-primary m-r-10px read-one-user-button' data-id='` + val.id + `'>
//                     <span class='glyphicon glyphicon-eye-open'></span> Просмотр
//                 </button>
//
//                 <!-- кнопка редактирования -->
//                 <button class='btn btn-info m-r-10px update-user-button' data-id='` + val.id + `'>
//                     <span class='glyphicon glyphicon-edit'></span> Edit
//                 </button>
//
//                 <!-- кнопка удаления товара -->
//                 <button class='btn btn-danger delete-user-button' data-id='` + val.id + `'>
//                     <span class='glyphicon glyphicon-remove'></span> Delete
//                 </button>
//             </td>
//
//         </tr>`;
//         });
//
//         // конец таблицы
//         read_users_html += `</table>`;
//
//         // вставка в 'page-content' нашего приложения
//         $("#page-content").html(read_users_html);


    //===================================================================================================

    let admin_panel_html = `
<!--container for the whole page excluding navbar start-->
<div class="container-fluid">

    <!-- кнопка для показа всех Users ================= потом удалить -->
    <div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>
        <span class='glyphicon glyphicon-list'></span> Users
    </div>

    <!--row for both panels (left/right) start-->
    <div class="row">

        <!--container for the_left_side_panel_(vertical_menu) start-->
        <div class="col-sm-2">
            <br>
            <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                    <a href="/admin" class="nav-link active">Admin</a>
                </li>
                <li class="nav-item">
                    <a href="/user" class="nav-link">User</a>
                </li>
            </ul>
        </div>
        <!--container for the_left_side_panel_(vertical_menu) end-->

        <!--container for the_right_side_panel_(tabs) start-->
        <div class="col-sm-10 bg-light px-5 vh-100">
            <br>
            <h1>Admin panel</h1>

            <!--сами вкладки (tabs) без содержимого начало-->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" id="users-tab" data-toggle="tab" href="#users" role="tab"
                       aria-controls="users" aria-selected="true">Users</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="new-tab" data-toggle="tab" href="#new" role="tab" aria-controls="new"
                       aria-selected="false">New user</a>
                </li>
            </ul>
            <!--сами вкладки (tabs) без содержимого конец-->

            <!--Содержимое вкладок начало-->
            <div class="tab-content" id="myTabContent">

                <!--Содержимое вкладки Users table начало-->
                <div class="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="users-tab">
                    <h5 class="d-flex ml-3 mt-1">All users</h5>

                    <!--сама таблица All users start-->
                    <table class="table table-striped bg-white">
                        <!--шапка таблицы All users start-->
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Roles</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <!--шапка таблицы All users end-->

                        <tbody id='users-filling'>
                        </tbody>
                    </table>
                    <!--сама таблица All users end-->
                </div>
                <!--Содержимое вкладки Users table конец-->

            </div>
            <!--Содержимое вкладок конец-->

        </div>
        <!--container for the_right_side_panel_(tabs) end-->

    </div>
    <!--row for both panels (left/right) end-->

</div>
<!--container for the whole page excluding navbar end-->
        `;

    $("#page-content").html(admin_panel_html);
}
// function showAdminPanel() выводит страницу Admin panel КОНЕЦ

// Эта функция считывает список юзеров и заполняет таблицу Users (начало)
function readUsers() {

    let users_html;

    // получить список Users из api НАЧАЛО
    $.getJSON("/api/admin/users", function (data) {
        // перебор списка возвращаемых данных :
        // на каждой итерации сначала достаем роли текущего юзера (юзера этой итерации), парсим их, кладем в массив,
        // для красивого вывода джойним массив в список (rollerList), после формируем строку со всеми данными юзера;
        // каждая итерация формирует следующую строку со следующим юзером
        $.each(data, function (key, user) {
            let rolesArr = [];
            for (let i = 0; i < user.roles.length; i++) {
                rolesArr.push(user.roles[i].role);
            }
            let rolesList = rolesArr.join(', ');

            // создание новой строки таблицы для каждой записи (для каждого юзера)
            users_html += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.age}</td>
                            <td>
                                <div>
                                    <span class="text-uppercase">${rolesList}</span>
                                </div>
                            </td>

                            <td>
                                <button class="btn btn-info edit-btn" data-toggle="modal"
                                        th:data-target="${'#Edit' + user.id}">Edit
                                </button>
                            </td>

                            <td>
                                <button th:data-target="${'#Delete' + user.id}"
                                        data-toggle="modal"
                                        class="btn btn-danger">Delete
                                </button>
                            </td>

<!--Код модалок является частью кода таблицы и строки (tr),
в которой расположены кнопки Edit/Delete (которые вызывают модалки при нажатии на них) 
Код модалок пока убрал!!! перенес его в ворд -->

                        </tr>`
        });

        $("#users-filling").html(users_html);

    });
    // получить список Users из api КОНЕЦ
}
// Эта функция считывает список юзеров и заполняет таблицу Users (конец)
