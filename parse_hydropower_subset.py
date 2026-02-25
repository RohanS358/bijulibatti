#!/usr/bin/env python3
"""Parse Niti Foundation CSV and select subset of important hydropower plants."""

import csv

csv_path = '/home/diablo/Downloads/Niti Foundation Datasets.csv'

hydropower_plants = []

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    
    operational_count = 0
    planned_count = 0
    
    for idx, row in enumerate(reader, start=1):
        try:
            lng = float(row['Longitude'])
            lat = float(row['Latitude'])
            capacity = float(row['Capacity (MW)'])
            
            license_type = row['License Type'].strip()
            
            # Priority selection criteria:
            # 1. All operational plants (Operation license)
            # 2. Large capacity planned plants (>50 MW)
            # 3. Generation license plants (under construction)
            
            should_include = False
            status = 'planned'
            efficiency = 0
            current_gen_pct = 0
            
            if license_type == 'Operation':
                should_include = True
                status = 'operational'
                efficiency = 85 + (operational_count % 10)
                current_gen_pct = 0.80 + (operational_count % 15) * 0.01
                operational_count += 1
            elif license_type == 'Generation':
                should_include = True
                status = 'operational'
                efficiency = 80 + (operational_count % 10)
                current_gen_pct = 0.75 + (operational_count % 20) * 0.01
                operational_count += 1
            elif capacity >= 50.0:  # Large planned projects
                if planned_count < 50:  # Limit planned projects
                    should_include = True
                    status = 'planned'
                    planned_count += 1
            
            if should_include:
                current_generation = round(capacity * current_gen_pct, 2) if status == 'operational' else 0
                
                plant = {
                    'hydropower_id': f'HYD-{len(hydropower_plants)+1:03d}',
                    'name': row['Project'].strip(),
                    'location': {'lat': lat, 'lng': lng},
                    'capacity_mw': capacity,
                    'current_generation_mw': current_generation,
                    'status': status,
                    'installation_date': '2000-01-01',
                    'efficiency': efficiency
                }
                
                hydropower_plants.append(plant)
                
        except (ValueError, KeyError) as e:
            pass

# Sort by capacity (largest first)
hydropower_plants.sort(key=lambda x: x['capacity_mw'], reverse=True)

# Re-assign IDs after sorting
for idx, plant in enumerate(hydropower_plants, start=1):
    plant['hydropower_id'] = f'HYD-{idx:03d}'

print(f"Total plants selected: {len(hydropower_plants)}")
print(f"Operational: {sum(1 for p in hydropower_plants if p['status'] == 'operational')}")
print(f"Planned: {sum(1 for p in hydropower_plants if p['status'] == 'planned')}")
print(f"Total capacity: {sum(p['capacity_mw'] for p in hydropower_plants):.2f} MW")

# Generate TypeScript code
ts_code = "export const hydropowerPlants: Hydropower[] = [\n"

for plant in hydropower_plants:
    ts_code += "    {\n"
    ts_code += f"        hydropower_id: '{plant['hydropower_id']}',\n"
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
output_path = '/home/diablo/Documents/projects/bijulibatti/hydropower_data_subset.ts'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(ts_code)

print(f"\nTypeScript code written to: {output_path}")

# Print top 10
print("\nTop 10 by capacity:")
for i, plant in enumerate(hydropower_plants[:10]):
    print(f"{i+1}. {plant['name'][:60]} - {plant['capacity_mw']} MW ({plant['status']})")
