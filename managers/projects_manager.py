""" Class keeps all projects list, allowing you to search it,
update, add, update and delete the elements. """
import uuid
import json

from black.db import Sessions
from black.db import ProjectDatabase

from common.logger import log


class ProjectManager(object):
    """ ProjectManager keeps track of all projects in the system,
    exposing some interfaces for public use. """

    def get_projects(self):
        """ Returns the list of projects """
        find_result = ProjectDatabase.find()

        if find_result["status"] == "success":
            return list(map(lambda x: x.dict(), find_result["projects"]))

        return find_result

    def create_project(self, project_name):
        """ Create a new project instance, save it to db and add
        minimal information for the web. """
        create_result = ProjectDatabase.create(
            project_name=project_name
        )

        if create_result["status"] == "success":
            create_result["project"] = create_result["project"].dict()

        return create_result


    def delete_project(self, project_uuid=None):
        """ Deletes a new project """
        return ProjectDatabase.delete(
            project_uuid=project_uuid
        )

    def update_project(self, project_uuid, project_name=None, comment=None):
        """ Update project base on uuid """
        update_result = ProjectDatabase.update(
            project_uuid=project_uuid,
            new_name=project_name,
            new_comment=comment
        )

        if update_result["status"] == "success":
            update_result["project"] = update_result["project"].dict()

        return update_result
