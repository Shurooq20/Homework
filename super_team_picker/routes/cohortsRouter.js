const express = require("express");
const knex = require("../connection");
const router = express.Router();

router.get("/new", (request, response) => {
  response.render("new");
});

router.post("/new", (request, response)=> {
    const {name, logoUrl, members} = request.body;
    knex("cohorts")
    .insert({
        name: name,
        members: members,
        logoUrl: logoUrl
    })
    .returning("*")
    .then(response.redirect("/cohorts/new"))
});
//get for Home Pag
router.get("/",(request, response) => {
    knex("cohorts")
    .orderBy("createdAt", "desc")
    .then(cohorts => {
        //response.send();
        response.render("cohorts", {cohorts});
    });
});

// get for :id page
router.get("/:id", (request, response) => {
    const id = request.params.id;
    const method = undefined;
    const count = undefined;
    console.log(id);
    knex("cohorts")
      .where("id", id)
      .first()
      .then(cohort => {
          console.log(cohort);
        if (cohort) {
          response.render("show", { cohort, method, count, teams: [] });
        } else {
          response.redirect("/cohorts/new");
        }
      });
  });

  // params GET/POST/PUT '/:id/:method' /5/count
  // query GET /5?method=count&type=short
  // body POST <form method="POST"><input name='method' value='count' /></form>
  // router Post
  router.post("/:id", (request, response) => {
    const body = request.body;
    const id = request.params.id;
    const method = body.method;
    const count = body.count ? Number(body.count) : undefined;
    if (!count || count < 1) {
      // show error in future
      response.redirect("/cohorts/" + id);
      return;
    }

    console.log(body, method);
    knex("cohorts")
      .where("id", id)
      .first()
      .then(cohort => {
        if (cohort) {
          console.log(cohort);
          const members = cohort.members.split(',').map(m => m.trim());
          const teams = [];
          if (method === 'per_team') {
            while(members.length) {
              teams.push(members.splice(0, count));
            }
          } else if (method === 'team_count') {
            const num = Math.floor(members.length/count);
            let ctr = 0;
            while(members.length) {
              if (teams.length === count) {
                teams[ctr] = [...teams[ctr], ...members.splice(0, 1)]
                ctr++;
                if (ctr === teams.length) {
                  ctr = 0;
                }
              } else {
                teams.push(members.splice(0, num));
              }
            }
          }
          response.render("show", { cohort, method, count, teams });
        } else {
          response.redirect("/cohorts/new");
        }
      });
  });

  router.delete("/:id", (request, response) => {
    // console.log("inside delete route: ", request.params.id);
    console.log(" Jimmy" )
    knex("cohorts")
      .where("id", request.params.id)
      .del()
      .then(() => {
        response.redirect("/cohorts");
      });
  });

  router.get("/:id/edit", (request, response) => {
    knex("cohorts")
      .where("id", request.params.id)
      .first()
      .then((cohort) => {
        response.render("edit", { cohort });
      });
  });

  router.patch("/:id", (request, response) => {
    const { title,content, imageUrl} = request.body;
    const updatedPost = {
      name:title,
      members:content,
      logoUrl:imageUrl,
    };

    console.log(updatedPost)
  
    knex("cohorts")
      .where("id", request.params.id)
      .update(updatedPost)
      .then((cohort) => {
        console.log(cohort)
        response.redirect(`/cohorts/${request.params.id}`);

      })
  });
  
  
module.exports = router;