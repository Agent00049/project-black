import React from 'react'
import { 
	Button, 
	Panel, 
	Glyphicon,
	ListGroup,
	ListGroupItem,
	Row,
	Col
} from 'react-bootstrap'

import ScopeComment from '../../../common/scope_comment/ScopeComment.jsx'

class IPEntryLine extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var rendered_ip_address = null;
		if (this.props.ip.ip_address) {
			rendered_ip_address = (
				<span>{this.props.ip.ip_address}
				<Glyphicon glyph="remove-circle" onClick={this.props.deleteScope} /></span>
			)
		}

		const header = ( 
			<h3>
				{rendered_ip_address || this.props.ip.hostname}
			</h3>
		)

		const ports = _.map(this.props.scans.sort((a, b) => {
			if (a["port_number"] > b["port_number"]) return 1;
			if (a["port_number"] < b["port_number"]) return -1;
			return 0;
		}), (x) => {
			return (
				<ListGroupItem key={x.scan_id + '_' + x.port_number}>
					<Row>
						<Col md={1}>{x.port_number}</Col>
						<Col md={1}>{x.protocol}</Col>
						<Col md={10}>{x.banner}</Col>
					</Row>
				</ListGroupItem>
			)
		});

		return (
			<Panel collapsible defaultExpanded header={header} bsStyle="primary">
				<ListGroup fill>
					<ListGroupItem>
						<ScopeComment commentValue={this.props.ip.comment}
									  onCommentSubmit={this.props.onCommentSubmit}/>
					</ListGroupItem>
					{ports}
				</ListGroup>		
			</Panel>
		)
	}
}

export default IPEntryLine;