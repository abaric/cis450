Philly Guide
============

Philly Guide's interactive features for the graduation rate and crime datasets are no longer active, but it can be visited at [https://philly-guide.herokuapp.com](https://philly-guide.herokuapp.com) to see the map and use the walk score feature.

About
----------
Philly Guide was built by Andrea Baric, Regina Burd, Alex Graves, and Mane Williams for our CIS450 (Database and Info Systems) final project.

Data Sources
----------
The geoJSON used to draw our neighborhoods is from [Azavea](https://github.com/azavea/geo-data).

The rest of our data was found on [Open Data Philly](https://www.opendataphilly.org/). Specifically, our crime data is from the [Philadelphia Police Department](https://www.opendataphilly.org/dataset/crime-incidents) and our schools data is from the School District of Philadelphia's [Open Data Initiative](https://www.philasd.org/performance/programsservices/open-data/). For WalkScore, we used [their API](https://www.walkscore.com/professional/api.php), as well as a set of [Philadelphia addresses](https://www.opendataphilly.org/dataset/opa-property-assessments).

All data-parsing and cleaning code (`neighborhoods.py` and `neighborhoods_table.py`) were written by us.

Development
-----------
To test, run `npm install` and then `npm start`. The app will be served at `http://localhost:3000`.
