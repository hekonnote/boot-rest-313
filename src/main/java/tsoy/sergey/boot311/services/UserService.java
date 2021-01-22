package tsoy.sergey.boot311.services;

//В приложении должна быть страница,
//  - на которую выводятся все юзеры с возможностью
//  - добавлять,
//  - удалять
//  - изменять юзера.

import tsoy.sergey.boot311.models.User;

import java.util.List;

public interface UserService {

    public List<User> getAll();

    public void add(User user);

    public void delete(Long id);

    public User getById(Long id);

    public User getByName(String name);

    public void update(Long id, User updatedUser);

}
