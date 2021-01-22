package tsoy.sergey.boot311.dao;

import org.springframework.stereotype.Repository;
import tsoy.sergey.boot311.models.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class RoleDaoImp implements RoleDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Role> getAll() {
//        return entityManager.createQuery("from Role").getResultList();
    return entityManager.createQuery("select r from Role r", Role.class).getResultList();
    }
    @Override
    public void add(Role role) {
        entityManager.persist(role);
    }

    @Override
    public void delete(Long id) {
        entityManager.remove(entityManager.find(Role.class, id));
    }

    @Override
    public Role getById(Long id) {
        TypedQuery<Role> query = entityManager.createQuery(
                "SELECT role FROM Role role WHERE role.id = :id", Role.class);
        return query
                .setParameter("id", id)
                .getSingleResult();
    }

    @Override
    public Role getByName(String roleName) {
                TypedQuery<Role> query = entityManager.createQuery(
                "SELECT role FROM Role role WHERE role.role = :roleName", Role.class);
        return query
                .setParameter("roleName", roleName)
                .getSingleResult();
    }

    @Override//нужно попробовать через merge()
    public void update(Long id, Role updatedRole) {
        Role roleToBeUpdated = getById(id);
        roleToBeUpdated.setRole(updatedRole.getRole());
        entityManager.merge(roleToBeUpdated);// не уверен, что это верно
    }
}
