import { Meteor } from "meteor/meteor";
import "../imports/api/publications";
import "../imports/api/methods";
import "../imports/api/services/publications";
import "../imports/api/services/methods";
import "../imports/api/reviews/publications";
import "../imports/api/reviews/methods";
import "../imports/api/notification/methods";
import "../imports/api/notification/publications";
import "../imports/api/images/publications";
import "../imports/api/images/methods";
import "../imports/api/rdv/methods";
import "../imports/api/rdv/publications";
import "../imports/api/consultations/methods";
import '../imports/api/consultations/publications'

import { WebApp } from "meteor/webapp";
import express from "express";

const app = express();
app.use(express.json());

app.use("/upload", require("./routes/upload"));

Meteor.startup(() => {
  WebApp.connectHandlers.use(app);
});
