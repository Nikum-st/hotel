import { Link, useMatch } from 'react-router-dom';
import { Button, Icon } from '../../../../../../../../../components';
import { useSelector } from 'react-redux';
import { selectRole } from '../../../../../../../../../../store';
import styles from './Buttons.module.css';
import { ROLE } from '../../../../../../../../../../constants';
import { forwardRef } from 'react';

export const Buttons = forwardRef(({ room, handleSave }, ref) => {
	const role = useSelector(selectRole);
	const isEditing = useMatch('/rooms/:name/edit');

	return (
		<div className={styles.Buttons}>
			{isEditing ? (
				<>
					<Icon
						color="black"
						onClick={handleSave}
						size="30px"
						id="fa-floppy-o"
					/>
					<label>
						<Icon type="file" color="black" size="30px" id="fa-floppy-o" />
						<input type="file" style={{ display: 'none' }} ref={ref} />
					</label>
				</>
			) : (
				<>
					<Link to={`/rooms/${room.name}/booking`}>
						<Button style={{ width: '140%' }}>Book</Button>
					</Link>
					{role === ROLE.ADMIN && (
						<Link to={`/rooms/${room.name}/edit`}>
							<Icon color="black" size="30px" id="fa-pencil-square-o" />
						</Link>
					)}
				</>
			)}
		</div>
	);
});
