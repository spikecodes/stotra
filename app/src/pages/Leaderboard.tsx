import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Box,
	Heading,
	Table,
	Tag,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useTheme,
} from "@chakra-ui/react";

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

	let accentColor =
		useTheme()["components"]["Link"]["baseStyle"]["color"].split(".")[0];

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
			<Heading size="lg" mb={4}>
				Leaderboard
			</Heading>
			<Table variant="simple" colorScheme="gray">
				<Thead>
					<Tr>
						<Th p={{ base: 2, md: 4 }}>Rank</Th>
						<Th p={{ base: 2, md: 4 }}>Username</Th>
						<Th p={{ base: 2, md: 4 }}>Portfolio Value</Th>
					</Tr>
				</Thead>
				<Tbody>
					{leaderboard.map((user, index) => (
						<Tr key={index}>
							<Td p={{ base: 2, md: 4 }}>
								<Tag colorScheme={index === 0 ? accentColor : "white"}>
									#{index + 1}
								</Tag>
							</Td>
							<Td
								p={{ base: 2, md: 4 }}
								overflow="hidden"
								textOverflow="ellipsis"
								whiteSpace="nowrap"
								maxW={5}
							>
								{user.username}
							</Td>
							<Td p={{ base: 2, md: 4 }}>{format(user.value)}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}

export default Leaderboard;
