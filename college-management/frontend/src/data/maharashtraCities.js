/* ===========================================================
   MAHARASHTRA CITIES DATABASE
   Format: { city, district, state }
   Used for autocomplete + auto-fill state/district
   =========================================================== */

const MAHARASHTRA_CITIES = [
  // Parbhani District (Gangakhed is here)
  { city: 'Gangakhed', district: 'Parbhani', state: 'Maharashtra' },
  { city: 'Parbhani', district: 'Parbhani', state: 'Maharashtra' },
  { city: 'Manwath', district: 'Parbhani', state: 'Maharashtra' },
  { city: 'Pathri', district: 'Parbhani', state: 'Maharashtra' },
  { city: 'Sailu', district: 'Parbhani', state: 'Maharashtra' },
  { city: 'Jintur', district: 'Parbhani', state: 'Maharashtra' },
  { city: 'Sonpeth', district: 'Parbhani', state: 'Maharashtra' },
  { city: 'Purna', district: 'Parbhani', state: 'Maharashtra' },
  { city: 'Palam', district: 'Parbhani', state: 'Maharashtra' },

  // Nanded District (neighbor)
  { city: 'Nanded', district: 'Nanded', state: 'Maharashtra' },
  { city: 'Kandhar', district: 'Nanded', state: 'Maharashtra' },
  { city: 'Loha', district: 'Nanded', state: 'Maharashtra' },
  { city: 'Mukhed', district: 'Nanded', state: 'Maharashtra' },
  { city: 'Degloor', district: 'Nanded', state: 'Maharashtra' },
  { city: 'Hadgaon', district: 'Nanded', state: 'Maharashtra' },
  { city: 'Bhokar', district: 'Nanded', state: 'Maharashtra' },
  { city: 'Kinwat', district: 'Nanded', state: 'Maharashtra' },
  { city: 'Mudkhed', district: 'Nanded', state: 'Maharashtra' },

  // Latur District
  { city: 'Latur', district: 'Latur', state: 'Maharashtra' },
  { city: 'Udgir', district: 'Latur', state: 'Maharashtra' },
  { city: 'Ausa', district: 'Latur', state: 'Maharashtra' },
  { city: 'Ahmadpur', district: 'Latur', state: 'Maharashtra' },
  { city: 'Nilanga', district: 'Latur', state: 'Maharashtra' },
  { city: 'Renapur', district: 'Latur', state: 'Maharashtra' },
  { city: 'Chakur', district: 'Latur', state: 'Maharashtra' },

  // Hingoli District
  { city: 'Hingoli', district: 'Hingoli', state: 'Maharashtra' },
  { city: 'Basmath', district: 'Hingoli', state: 'Maharashtra' },
  { city: 'Kalamnuri', district: 'Hingoli', state: 'Maharashtra' },
  { city: 'Sengaon', district: 'Hingoli', state: 'Maharashtra' },

  // Beed District
  { city: 'Beed', district: 'Beed', state: 'Maharashtra' },
  { city: 'Majalgaon', district: 'Beed', state: 'Maharashtra' },
  { city: 'Ambajogai', district: 'Beed', state: 'Maharashtra' },
  { city: 'Georai', district: 'Beed', state: 'Maharashtra' },
  { city: 'Kaij', district: 'Beed', state: 'Maharashtra' },
  { city: 'Patoda', district: 'Beed', state: 'Maharashtra' },

  // Aurangabad / Chhatrapati Sambhajinagar
  { city: 'Aurangabad', district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  { city: 'Chhatrapati Sambhajinagar', district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  { city: 'Paithan', district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  { city: 'Sillod', district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  { city: 'Vaijapur', district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  { city: 'Kannad', district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  { city: 'Gangapur', district: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },

  // Jalna District
  { city: 'Jalna', district: 'Jalna', state: 'Maharashtra' },
  { city: 'Ambad', district: 'Jalna', state: 'Maharashtra' },
  { city: 'Partur', district: 'Jalna', state: 'Maharashtra' },
  { city: 'Bhokardan', district: 'Jalna', state: 'Maharashtra' },

  // Osmanabad / Dharashiv
  { city: 'Osmanabad', district: 'Dharashiv', state: 'Maharashtra' },
  { city: 'Dharashiv', district: 'Dharashiv', state: 'Maharashtra' },
  { city: 'Tuljapur', district: 'Dharashiv', state: 'Maharashtra' },
  { city: 'Umarga', district: 'Dharashiv', state: 'Maharashtra' },
  { city: 'Bhoom', district: 'Dharashiv', state: 'Maharashtra' },

  // Mumbai
  { city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra' },
  { city: 'Andheri', district: 'Mumbai Suburban', state: 'Maharashtra' },
  { city: 'Borivali', district: 'Mumbai Suburban', state: 'Maharashtra' },
  { city: 'Bandra', district: 'Mumbai Suburban', state: 'Maharashtra' },
  { city: 'Dadar', district: 'Mumbai City', state: 'Maharashtra' },
  { city: 'Kurla', district: 'Mumbai Suburban', state: 'Maharashtra' },
  { city: 'Goregaon', district: 'Mumbai Suburban', state: 'Maharashtra' },
  { city: 'Malad', district: 'Mumbai Suburban', state: 'Maharashtra' },

  // Thane District
  { city: 'Thane', district: 'Thane', state: 'Maharashtra' },
  { city: 'Kalyan', district: 'Thane', state: 'Maharashtra' },
  { city: 'Dombivli', district: 'Thane', state: 'Maharashtra' },
  { city: 'Bhiwandi', district: 'Thane', state: 'Maharashtra' },
  { city: 'Ulhasnagar', district: 'Thane', state: 'Maharashtra' },
  { city: 'Ambernath', district: 'Thane', state: 'Maharashtra' },
  { city: 'Mira Road', district: 'Thane', state: 'Maharashtra' },
  { city: 'Bhayander', district: 'Thane', state: 'Maharashtra' },

  // Pune District
  { city: 'Pune', district: 'Pune', state: 'Maharashtra' },
  { city: 'Pimpri-Chinchwad', district: 'Pune', state: 'Maharashtra' },
  { city: 'Pimpri', district: 'Pune', state: 'Maharashtra' },
  { city: 'Chinchwad', district: 'Pune', state: 'Maharashtra' },
  { city: 'Hadapsar', district: 'Pune', state: 'Maharashtra' },
  { city: 'Hinjewadi', district: 'Pune', state: 'Maharashtra' },
  { city: 'Baramati', district: 'Pune', state: 'Maharashtra' },
  { city: 'Talegaon', district: 'Pune', state: 'Maharashtra' },
  { city: 'Lonavala', district: 'Pune', state: 'Maharashtra' },
  { city: 'Shirur', district: 'Pune', state: 'Maharashtra' },

  // Nagpur District
  { city: 'Nagpur', district: 'Nagpur', state: 'Maharashtra' },
  { city: 'Kamptee', district: 'Nagpur', state: 'Maharashtra' },
  { city: 'Katol', district: 'Nagpur', state: 'Maharashtra' },
  { city: 'Umred', district: 'Nagpur', state: 'Maharashtra' },
  { city: 'Hingna', district: 'Nagpur', state: 'Maharashtra' },

  // Nashik District
  { city: 'Nashik', district: 'Nashik', state: 'Maharashtra' },
  { city: 'Malegaon', district: 'Nashik', state: 'Maharashtra' },
  { city: 'Manmad', district: 'Nashik', state: 'Maharashtra' },
  { city: 'Igatpuri', district: 'Nashik', state: 'Maharashtra' },
  { city: 'Sinnar', district: 'Nashik', state: 'Maharashtra' },
  { city: 'Yeola', district: 'Nashik', state: 'Maharashtra' },

  // Solapur District
  { city: 'Solapur', district: 'Solapur', state: 'Maharashtra' },
  { city: 'Pandharpur', district: 'Solapur', state: 'Maharashtra' },
  { city: 'Barshi', district: 'Solapur', state: 'Maharashtra' },
  { city: 'Akkalkot', district: 'Solapur', state: 'Maharashtra' },
  { city: 'Karmala', district: 'Solapur', state: 'Maharashtra' },

  // Kolhapur District
  { city: 'Kolhapur', district: 'Kolhapur', state: 'Maharashtra' },
  { city: 'Ichalkaranji', district: 'Kolhapur', state: 'Maharashtra' },
  { city: 'Jaysingpur', district: 'Kolhapur', state: 'Maharashtra' },
  { city: 'Gadhinglaj', district: 'Kolhapur', state: 'Maharashtra' },
  { city: 'Kagal', district: 'Kolhapur', state: 'Maharashtra' },

  // Sangli District
  { city: 'Sangli', district: 'Sangli', state: 'Maharashtra' },
  { city: 'Miraj', district: 'Sangli', state: 'Maharashtra' },
  { city: 'Tasgaon', district: 'Sangli', state: 'Maharashtra' },
  { city: 'Vita', district: 'Sangli', state: 'Maharashtra' },

  // Satara District
  { city: 'Satara', district: 'Satara', state: 'Maharashtra' },
  { city: 'Karad', district: 'Satara', state: 'Maharashtra' },
  { city: 'Wai', district: 'Satara', state: 'Maharashtra' },
  { city: 'Phaltan', district: 'Satara', state: 'Maharashtra' },
  { city: 'Mahabaleshwar', district: 'Satara', state: 'Maharashtra' },

  // Ahmednagar District
  { city: 'Ahmednagar', district: 'Ahmednagar', state: 'Maharashtra' },
  { city: 'Shrirampur', district: 'Ahmednagar', state: 'Maharashtra' },
  { city: 'Kopargaon', district: 'Ahmednagar', state: 'Maharashtra' },
  { city: 'Sangamner', district: 'Ahmednagar', state: 'Maharashtra' },
  { city: 'Shirdi', district: 'Ahmednagar', state: 'Maharashtra' },
  { city: 'Rahuri', district: 'Ahmednagar', state: 'Maharashtra' },

  // Akola
  { city: 'Akola', district: 'Akola', state: 'Maharashtra' },
  { city: 'Akot', district: 'Akola', state: 'Maharashtra' },
  { city: 'Balapur', district: 'Akola', state: 'Maharashtra' },

  // Amravati
  { city: 'Amravati', district: 'Amravati', state: 'Maharashtra' },
  { city: 'Achalpur', district: 'Amravati', state: 'Maharashtra' },
  { city: 'Anjangaon', district: 'Amravati', state: 'Maharashtra' },
  { city: 'Daryapur', district: 'Amravati', state: 'Maharashtra' },

  // Buldhana
  { city: 'Buldhana', district: 'Buldhana', state: 'Maharashtra' },
  { city: 'Khamgaon', district: 'Buldhana', state: 'Maharashtra' },
  { city: 'Malkapur', district: 'Buldhana', state: 'Maharashtra' },
  { city: 'Mehkar', district: 'Buldhana', state: 'Maharashtra' },
  { city: 'Shegaon', district: 'Buldhana', state: 'Maharashtra' },

  // Yavatmal
  { city: 'Yavatmal', district: 'Yavatmal', state: 'Maharashtra' },
  { city: 'Pusad', district: 'Yavatmal', state: 'Maharashtra' },
  { city: 'Wani', district: 'Yavatmal', state: 'Maharashtra' },
  { city: 'Digras', district: 'Yavatmal', state: 'Maharashtra' },

  // Washim
  { city: 'Washim', district: 'Washim', state: 'Maharashtra' },
  { city: 'Karanja', district: 'Washim', state: 'Maharashtra' },
  { city: 'Risod', district: 'Washim', state: 'Maharashtra' },

  // Chandrapur
  { city: 'Chandrapur', district: 'Chandrapur', state: 'Maharashtra' },
  { city: 'Ballarpur', district: 'Chandrapur', state: 'Maharashtra' },
  { city: 'Warora', district: 'Chandrapur', state: 'Maharashtra' },
  { city: 'Bhadravati', district: 'Chandrapur', state: 'Maharashtra' },

  // Wardha
  { city: 'Wardha', district: 'Wardha', state: 'Maharashtra' },
  { city: 'Hinganghat', district: 'Wardha', state: 'Maharashtra' },
  { city: 'Pulgaon', district: 'Wardha', state: 'Maharashtra' },
  { city: 'Arvi', district: 'Wardha', state: 'Maharashtra' },

  // Gondia
  { city: 'Gondia', district: 'Gondia', state: 'Maharashtra' },
  { city: 'Tirora', district: 'Gondia', state: 'Maharashtra' },

  // Bhandara
  { city: 'Bhandara', district: 'Bhandara', state: 'Maharashtra' },
  { city: 'Tumsar', district: 'Bhandara', state: 'Maharashtra' },

  // Gadchiroli
  { city: 'Gadchiroli', district: 'Gadchiroli', state: 'Maharashtra' },
  { city: 'Desaiganj', district: 'Gadchiroli', state: 'Maharashtra' },

  // Jalgaon
  { city: 'Jalgaon', district: 'Jalgaon', state: 'Maharashtra' },
  { city: 'Bhusawal', district: 'Jalgaon', state: 'Maharashtra' },
  { city: 'Chalisgaon', district: 'Jalgaon', state: 'Maharashtra' },
  { city: 'Amalner', district: 'Jalgaon', state: 'Maharashtra' },
  { city: 'Pachora', district: 'Jalgaon', state: 'Maharashtra' },

  // Dhule
  { city: 'Dhule', district: 'Dhule', state: 'Maharashtra' },
  { city: 'Sakri', district: 'Dhule', state: 'Maharashtra' },
  { city: 'Shirpur', district: 'Dhule', state: 'Maharashtra' },

  // Nandurbar
  { city: 'Nandurbar', district: 'Nandurbar', state: 'Maharashtra' },
  { city: 'Shahada', district: 'Nandurbar', state: 'Maharashtra' },
  { city: 'Taloda', district: 'Nandurbar', state: 'Maharashtra' },

  // Raigad
  { city: 'Alibag', district: 'Raigad', state: 'Maharashtra' },
  { city: 'Panvel', district: 'Raigad', state: 'Maharashtra' },
  { city: 'Karjat', district: 'Raigad', state: 'Maharashtra' },
  { city: 'Khopoli', district: 'Raigad', state: 'Maharashtra' },
  { city: 'Pen', district: 'Raigad', state: 'Maharashtra' },
  { city: 'Mahad', district: 'Raigad', state: 'Maharashtra' },

  // Ratnagiri
  { city: 'Ratnagiri', district: 'Ratnagiri', state: 'Maharashtra' },
  { city: 'Chiplun', district: 'Ratnagiri', state: 'Maharashtra' },
  { city: 'Khed', district: 'Ratnagiri', state: 'Maharashtra' },
  { city: 'Dapoli', district: 'Ratnagiri', state: 'Maharashtra' },

  // Sindhudurg
  { city: 'Sindhudurg', district: 'Sindhudurg', state: 'Maharashtra' },
  { city: 'Sawantwadi', district: 'Sindhudurg', state: 'Maharashtra' },
  { city: 'Kudal', district: 'Sindhudurg', state: 'Maharashtra' },
  { city: 'Vengurla', district: 'Sindhudurg', state: 'Maharashtra' },

  // Palghar
  { city: 'Palghar', district: 'Palghar', state: 'Maharashtra' },
  { city: 'Vasai', district: 'Palghar', state: 'Maharashtra' },
  { city: 'Virar', district: 'Palghar', state: 'Maharashtra' },
  { city: 'Boisar', district: 'Palghar', state: 'Maharashtra' },
  { city: 'Dahanu', district: 'Palghar', state: 'Maharashtra' },

  // Navi Mumbai
  { city: 'Navi Mumbai', district: 'Thane', state: 'Maharashtra' },
  { city: 'Vashi', district: 'Thane', state: 'Maharashtra' },
  { city: 'Nerul', district: 'Thane', state: 'Maharashtra' },
  { city: 'Belapur', district: 'Thane', state: 'Maharashtra' },
  { city: 'Kharghar', district: 'Raigad', state: 'Maharashtra' },
];

export default MAHARASHTRA_CITIES;

