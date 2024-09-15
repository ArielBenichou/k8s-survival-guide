import { createConnection } from 'mariadb';

// Database connection configuration
const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};

// Initial seed data
const seedData = [
	{ name: 'Zorblax', species: 'Martian Fluffball', planet: 'Mars' },
	{ name: 'Quarkle', species: 'Venusian Slimeworm', planet: 'Venus' },
	{ name: 'Nebula', species: 'Jupiterian Cloudhopper', planet: 'Jupiter' },
	{ name: 'Xenon', species: 'Plutonian Icecrawler', planet: 'Pluto' },
	{ name: 'Nova', species: 'Saturnian Ringdancer', planet: 'Saturn' },
	{ name: 'Cosmo', species: 'Mercurian Heatwave', planet: 'Mercury' },
	{ name: 'Luna', species: 'Lunar Dustbunny', planet: 'Moon' },
	{ name: 'Stardust', species: 'Asteroid Belt Rockhopper', planet: 'Ceres' },
	{ name: 'Comet', species: 'Neptunian Wavesurfer', planet: 'Neptune' },
	{ name: 'Galileo', species: 'Ionian Sulfurbreather', planet: 'Io' },
	{ name: 'Zephyr', species: 'Uranian Windglider', planet: 'Uranus' }
];

async function initializeDatabase() {
	let connection;

	try {
		connection = await createConnection(dbConfig);

		// Create the pets table if it doesn't exist
		await connection.query(`
      CREATE TABLE IF NOT EXISTS pets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        species VARCHAR(255) NOT NULL,
        planet VARCHAR(255) NOT NULL
      )
    `);

		console.log('Pets table created or already exists.');

		// Check if the table is empty
		const res = await connection.query('SELECT COUNT(*) as count FROM pets');
		const [count] = res;

		if (Number(count.count) === 0) {
			// Insert seed data
			for (const pet of seedData) {
				await connection.query(
					'INSERT INTO pets (name, species, planet) VALUES (?, ?, ?)',
					[pet.name, pet.species, pet.planet]
				);
			}
			console.log(`${seedData.length} pets inserted into the database.`);
		} else {
			console.log('Database already contains data. Skipping seed process.');
		}

		console.log('Database initialization and seeding completed successfully.');
	} catch (error) {
		console.error('Error initializing database:', error);
	} finally {
		if (connection) {
			await connection.end();
		}
	}
}

// Run the initialization function
initializeDatabase();
