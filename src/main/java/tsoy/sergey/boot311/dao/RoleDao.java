package tsoy.sergey.boot311.dao;

import tsoy.sergey.boot311.models.Role;

import java.util.List;

public interface RoleDao {
    List<Role> getAll();

    void add(Role role);

    void delete(Long id);

    Role getById(Long id);

    Role getByName(String roleName);

    void update(Long id, Role updatedRole);
}