package tsoy.sergey.boot311.dao;

import tsoy.sergey.boot311.models.User;

import java.util.List;

//В приложении должна быть страница,
//  - на которую выводятся все юзеры с возможностью
//  - добавлять,
//  - удалять
//  - изменять юзера.

public interface UserDao {

    List<User> getAll();

    void add(User user);

    void delete(Long id);

    User getById(Long id);

    User getByName(String name);

    void update(Long id, User updatedUser);

}
