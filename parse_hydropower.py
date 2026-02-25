#!/usr/bin/env python3
"""Parse Niti Foundation hydropower CSV and generate TypeScript array."""

import csv
import json

# Read the CSV file
csv_path = '/home/diablo/Downloads/Niti Foundation Datasets.csv'

hydropower_plants = []
errors = []

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    
    for idx, row in enumerate(reader, start=1):
        try:
            # Parse coordinates and capacity
            lng = float(row['Longitude'])
            lat = float(row['Latitude'])
            capacity = float(row['Capacity (MW)'])
            
            # Map license type to status
            license_type = row['License Type'].strip()
            if license_type == 'Operation':
                status = 'operational'
                efficiency = 85 + (idx % 10)  # Vary efficiency 85-94%
                current_gen_pct = 0.80 + (idx % 15) * 0.01  # 80-94% of capacity
            elif license_type == 'Generation':
                status = 'operational'
                efficiency = 80 + (idx % 10)
                current_gen_pct = 0.75 + (idx % 20) * 0.01
            else:  # Survey, planned, etc.
                status = 'planned'
                efficiency = 0
                current_gen_pct = 0
            
            # Calculate current generation
            current_generation = round(capacity * current_gen_pct, 2) if status == 'operational' else 0
            
            # Create hydropower entry
            plant = {
                'hydropower_id': f'HYD-{idx:03d}',
                'name': row['Project'].strip(),
                'location': {'lat': lat, 'lng': lng},
                'capacity_mw': capacity,
                'current_generation_mw': current_generation,
                'status': status,
                'installation_date': '2000-01-01',  # Default date
                'efficiency': efficiency
            }
            
            hydropower_plants.append(plant)
            
        except (ValueError, KeyError) as e:
            errors.append(f"Row {idx}: {row.get('Project', 'Unknown')} - {str(e)}")

# Print statistics
print(f"Total plants parsed: {len(hydropower_plants)}")
print(f"Operational: {sum(1 for p in hydropower_plants if p['status'] == 'operational')}")
print(f"Planned: {sum(1 for p in hydropower_plants if p['status'] == 'planned')}")
print(f"Errors: {len(errors)}")

# Generate TypeScript code
ts_code = "export const hydropowerPlants: Hydropower[] = [\n"

for plant in hydropower_plants:
    ts_code += "    {\n"
    ts_code += f"        hydropower_id: '{plant['hydropower_id']}',\n"
    # Escape single quotes in name
    name = plant['name'].replace("'", "\\'")
    ts_code += f"        name: '{name}',\n"
    ts_code += f"        location: {{ lat: {plant['location']['lat']}, lng: {plant['location']['lng']} }},\n"
    ts_code += f"        capacity_mw: {plant['capacity_mw']},\n"
    ts_code += f"        current_generation_mw: {plant['current_generation_mw']},\n"
    ts_code += f"        status: '{plant['status']}',\n"
    ts_code += f"        installation_date: '{plant['installation_date']}',\n"
    ts_code += f"        efficiency: {plant['efficiency']}\n"
    ts_code += "    },\n"

ts_code += "];\n"

# Write to file
output_path = '/home/diablo/Documents/projects/bijulibatti/hydropower_data.ts'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(ts_code)

print(f"\nTypeScript code written to: {output_path}")
print(f"Total capacity: {sum(p['capacity_mw'] for p in hydropower_plants):.2f} MW")

# Print first 5 for verification
print("\nFirst 5 entries:")
for i, plant in enumerate(hydropower_plants[:5]):
    print(f"{i+1}. {plant['name'][:50]} - {plant['capacity_mw']} MW ({plant['status']})")
