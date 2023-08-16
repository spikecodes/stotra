import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface LeaderboardUser {
	username: string;
	value: number;
}

const format = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
}).format;

function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

	useEffect(() => {
		axios
			.get("/api/user/leaderboard")
			.then((res) => {
				setLeaderboard(res.data.users);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Box className="leaderboard">
			<Table variant="simple" colorScheme="gray">
				<Thead>
					<Tr>
						<Th>Rank</Th>
						<Th>Username</Th>
						<Th>Portfolio Value</Th>
					</Tr>
				</Thead>
				<Tbody>
					{leaderboard.map((user, index) => (
						<Tr key={index}>
							<Td>
								<Tag colorScheme={index === 0 ? "teal" : "white"}>
									#{index + 1}
								</Tag>
							</Td>
							<Td>{user.username}</Td>
							<Td>{format(user.value)}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}

export default Leaderboard;
