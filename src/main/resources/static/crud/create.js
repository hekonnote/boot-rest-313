$(document).ready(function () {

    let newUserTab_html = `
                <!--Содержимое вкладки New user начало-->
                    <!-- содержимое пока убрал    -->
                <div class="tab-pane fade" id="new" role="tabpanel" aria-labelledby="new-tab">
                    <h5 class="d-flex ml-3 mt-1">Add new user</h5>
                    <div class="container-fluid bg-white px-5 py-3 vh-100 text-center">
                
                        <div class="row">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-6">
                
                                <form action="/admin/users" method="post" id="add-new-user-form">
                
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
                
<!--                                    <div class="form-group">-->
<!--                                        <input type="submit" class="btn btn-success" value="Add new user">-->
<!--         <span class='glyphicon glyphicon-plus'></span>                           </div>-->

                                    <div class="form-group">
                                        <button type='submit' class='btn btn-success'>Add new user</button>
                                    </div>
                                    
                                </form>
                            </div>
                            <div class="col-sm-3"></div>
                        </div>
                    </div>
                
                </div>
                <!--Содержимое вкладки New user конец-->
`;
    $("#myTabContent").append(newUserTab_html);

    //переменная для хранения ролей
    let options_html = null;

    //создаем возможность выбора ролей в цикле: <option>ROLE_USER</option> через js-код
    //                                          <option>ROLE_ADMIN</option> через js-код
    $.getJSON("/api/users/new", function (blankUser) {
        for (let i = 0; i < blankUser.roles.length; i++) {
            options_html += `
            <option>${blankUser.roles[i].role}</option>
            `;
        }
        $("#roles").append(options_html);

    });

    // будет работать, если создана форма товара
    $(document).on('submit', '#add-new-user-form', function(){
        // получение данных формы
        var form_data=JSON.stringify($(this).serializeObject());

        // отправка данных формы в API
        $.ajax({
            url: "/api/admin/users",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // продукт был создан, вернуться к списку продуктов
                readUsers();
            },
            error: function(xhr, resp, text) {
                // вывести ошибку в консоль
                console.log(xhr, resp, text);
            }
        });

        return false;
    });

});

