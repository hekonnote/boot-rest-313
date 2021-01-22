package tsoy.sergey.boot311.dao;

import org.springframework.stereotype.Repository;
import tsoy.sergey.boot311.models.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Repository
public class UserDaoImp implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getAll() {
        return entityManager.createQuery("select u from User u", User.class).getResultList();
//        return entityManager.createQuery("from User", User.class).getResultList();
    }

    @Override
    public void add(User user) {
        entityManager.persist(user);
    }

    @Override
    public void delete(Long id) {
        entityManager.remove(entityManager.find(User.class, id));
    }

    @Override
    public User getById(Long id) {
        TypedQuery<User> query = entityManager.createQuery(
                "SELECT user FROM User user WHERE user.id = :id", User.class);
        return query
                .setParameter("id", id)
                .getSingleResult();
    }

    @Override
    public User getByName(String name) {
        TypedQuery<User> query = entityManager.createQuery(
                "SELECT user FROM User user WHERE user.name = :name", User.class);
        query.setParameter("name", name);
        List<User> results = query.getResultList();
        return results.isEmpty() ? null : results.get(0);
    }

    @Override //реализация этого метода вызывает у меня сомнение //нужно попробовать через merge()
    public void update(Long id, User updatedUser) {
        User userToBeUpdated = getById(id);
        userToBeUpdated.setName(updatedUser.getName());
        userToBeUpdated.setAge(updatedUser.getAge());
        userToBeUpdated.setPassword(updatedUser.getPassword());
        userToBeUpdated.setRoles(updatedUser.getRoles());

        entityManager.merge(userToBeUpdated);// не уверен, что это верно
    }
}


//    private final Map<String, User> userMap = Collections.singletonMap("test",
//            new User(1L, "test", "test", Collections.singleton(new Role(1L, "ROLE_USER"))));
//    // name - уникальное значение, выступает в качестве ключа Map
