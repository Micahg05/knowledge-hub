import type { PageServerLoad } from './$types'
import { parse } from 'yaml'
import fs from 'fs'

let resources_path: string = "data/resources.yml"

// Reading in resources
const file = fs.readFileSync(resources_path, 'utf8')
const yml_data = parse(file) // TODO: Create interface for this, and then use it to validate edits during CI/CD

// Creating a list of unique tags
let tags: string[] = [];
let resource;
for (resource of yml_data) {
  tags.push(...resource.tags)
}
tags = [...new Set(tags)]

//Sorting resources by newest (assuming newest is at the bottom of the file )
const yml_data_sort = [...yml_data].reverse();

export function load(params: PageServerLoad) {
  return {
    payload: {
      resources: yml_data_sort,
      tags: tags,
    }
  }
}
