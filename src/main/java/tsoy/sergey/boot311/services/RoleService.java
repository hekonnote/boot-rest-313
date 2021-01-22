package tsoy.sergey.boot311.services;

import tsoy.sergey.boot311.models.Role;

import java.util.List;

public interface RoleService {
    public List<Role> getAll();

    public void add(Role role);

    public void delete(Long id);

    public Role getById(Long id);

    public Role getByName(String roleName);

    public void update(Long id, Role updatedRole);
}
