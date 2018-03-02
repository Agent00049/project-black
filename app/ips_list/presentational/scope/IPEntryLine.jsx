import React from 'react'

import {
	Button,
	Card,
	Table,
	Header,
	Divider,
	Popup,
	List,
	Label
} from 'semantic-ui-react'

import ScopeComment from '../../../common/scope_comment/ScopeComment.jsx'


class IPEntryLine extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { ip, project_uuid, deleteIP, onCommentSubmit } = this.props;
		const verbose_host_link = '/project/' + project_uuid + '/ip/' + ip.ip_address;

		const footer = (
			<div>
	            <a onClick={() => window.open(verbose_host_link, Math.random().toString(36).substring(7), 'width=850,height=700')}>
					<Button basic size="tiny">
						Verbose
					</Button>
	            </a>

				<Button basic color="red" size="tiny" onClick={deleteIP}>
					Delete
				</Button>
			</div>
		);
		const ports = _.map(ip.scans.sort((a, b) => {
			if (a["port_number"] > b["port_number"]) return 1;
			if (a["port_number"] < b["port_number"]) return -1;
			return 0;
		}), (x) => {
			return (
				<Table.Row key={x.scan_id + '_' + x.port_number}>
					<Table.Cell>{x.port_number}</Table.Cell>
					<Table.Cell>{x.protocol}</Table.Cell>
					<Table.Cell>{x.banner}</Table.Cell>
				</Table.Row>
			)
		});

		let hostnames = ip.hostnames;
		let hostnames_view = null;

			hostnames_view = hostnames.slice(0, 4).map((elem) => {
				return <Label key={elem + '_' + ip.ip_address}>{elem}</Label>;
			});
			if (hostnames.length > 4) {
				hostnames_view.push(
					<Popup key={ip.ip_address + "_others"}
						trigger={<Label>...</Label>}
						content={
							hostnames.slice(4).map((elem) => {
								return <Label key={elem + '_' + ip.ip_address}>{elem}</Label>;
							})
						}
					/>					
				);
			}

		let files_by_statuses = {
			'2xx': ip.files.filter((x) => {
				return Math.floor(x.status_code / 100) === 2;
			}).length,
			'3xx': ip.files.filter((x) => {
				return Math.floor(x.status_code / 100) === 3;
			}).length,
			'4xx': ip.files.filter((x) => {
				return Math.floor(x.status_code / 100) === 4 && x.status_code !== 404;
			}).length,	
			'5xx': ip.files.filter((x) => {
				return Math.floor(x.status_code / 100) === 5 && x.status_code !== 404;
			}).length						
		};

		const description = (
			<div>
				<Header>{ip.ip_address}</Header>
				<Divider/>
				<ScopeComment comment={ip.comment}
						  	  onCommentSubmit={onCommentSubmit} />

				<div style={{"wordBreak": "break-all"}}>{hostnames_view}</div>

				<Divider hidden />
				<List bulleted>
					<List.Item>2xx: <strong>{files_by_statuses['2xx']}</strong></List.Item> 
					<List.Item>3xx: {files_by_statuses['3xx']}</List.Item>
					<List.Item>4xx: {files_by_statuses['4xx']}</List.Item>
					<List.Item>5xx: {files_by_statuses['5xx']}</List.Item>
				</List>
				<Divider hidden />

				<Table basic="very">
					<Table.Body>
						{ports}
					</Table.Body>
				</Table>
			</div>
		)

		return (
			<Card color="blue">
				<Card.Content description={description} />
				<Card.Content extra>{footer}</Card.Content>
			</Card>	
		)	
	}
}

export default IPEntryLine;