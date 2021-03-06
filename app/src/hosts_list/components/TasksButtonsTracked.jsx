import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import ButtonTasks from '../../common/tasks_buttons/components/ButtonTasks.jsx'

import { requestCreateTask } from '../../redux/tasks/actions.js'


class TasksButtonsTracked extends React.Component {
	constructor(props) {
		super(props);

		this.dirbusterStart = this.dirbusterStart.bind(this);
		this.runPatator = this.runPatator.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		return !_.isEqual(nextProps, this.props);
	}	

	dirbusterStart(options) {
		this.context.store.dispatch(requestCreateTask(
			'dirsearch', 
			this.props.filters,
			{'program': options,
				'targets': 'hosts'},
			this.props.project_uuid
		));
	}

	runPatator(params) {
		this.context.store.dispatch(requestCreateTask(
			'patator', 
			this.props.filters, 
			{'program': [params["argv"]],
			'targets': 'hosts'},
			this.props.project_uuid
		));
	}


	render() {
		return (
			<ButtonTasks
				dicts={this.props.dicts}
				project_uuid={this.props.project_uuid}
				tasks={
				[
					{
						"name": "Dirbuter",
						"handler": this.dirbusterStart,
						"preformed_options": [
							{
								"name": "PHP fanboy",
								"options": {
									"extensions": "php,php5,phps,php.bak",
									"path": "/"
								}
							},
							{
								"name": "ASP faggot",
								"options": {
									"extensions": "asp,aspx",
									"path": "/"
								}
							},
							{
								"name": "Personal favourites",
								"options": {
									"extensions": "php,txt,conf,log,bak,sql,asp,aspx,tar.gz,tar,zip,~",
									"path": "/"
								}
							}
						],
						"available_options": [
							{
								"name": "path",
								"type": "text",
								"default_value": "/"
							},						
							{
								"name": "extensions",
								"type": "text",
								"default_value": "php,txt,conf,log,bak,sql,asp,aspx,tar.gz,tar,zip,~"
							},
							{
								"name": "cookie",
								"type": "text",
								"default_value": ""
							},
							{
								"name": "recursive",
								"type": "checkbox",
								"default_value": false
							}				
						]
					},
					{
						"name": "Patator",
						"dictionaries_available": true,
						"help": [
							{
								"type": "warning",
								"condition": !this.props.filters.hasOwnProperty('port') || this.props.filters.port.length > 1 || this.props.filters.port.indexOf('%') !== -1,
								"text": "You have selected more than one port. It is not recommended to launch patator like this as there can be many different types of applications. Use more specific filters"
							},
							{
								"type": "info",
								"condition": true,
								"text": "Don't specify any target here, all the hosts will be pulled based on your current filters"
							}
						],
						"handler": this.runPatator,
						"preformed_options": [
							{
								"name": "FTP",
								"options": {
									"argv": "ftp_login user=FILE0 password=FILE1 0=logins.txt 1=passwords.txt -x ignore:mesg='Login incorrect.' -x ignore,reset,retry:code=500 -x ignore:code=530"
								}
							},
							{
								"name": "SSH",
								"options": {
									"argv": "ssh_login user=FILE0 password=FILE1 0=logins.txt 1=passwords.txt -x ignore:mesg='Authentication failed.'"
								}
							},
							{
								"name": "VNC",
								"options": {
									"argv": "vnc_login password=FILE0 0=passwords.txt --threads 1"
								}
							},
							{
								"name": "RDP",
								"options": {
									"argv": "rdp_login user='administrator' password=FILE0 0=passwords.txt"
								}
							}
						],
						"available_options": [
							{
								"name": "argv",
								"type": "text",
								"default_value": ""
							}
						]
					}					
				]
			} />
		)
	}
}

TasksButtonsTracked.contextTypes = {
    store: PropTypes.object
}

export default TasksButtonsTracked;