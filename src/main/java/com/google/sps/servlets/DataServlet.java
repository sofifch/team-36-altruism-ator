// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("text/html;");
    response.getWriter().println("<h1>Hello world!</h1>");
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      String initiativeTitle = request.getParameter("initiative-title");
      String initiativeLocation = request.getParameter("initiative-location");
      String initiativeStartDate = request.getParameter("initiative-start-date");
      String initiativeEndDate = request.getParameter("initiative-end-date");
      String initiativeContext = request.getParameter("initiative-context");
      String initiativeCause = request.getParameter("initiative-cause");
      String initiativeTargetAudience = request.getParameter("initiative-target-audience");
      String initiativeInstructions = request.getParameter("initiative-instructions");
      String initiativeImageUrl = request.getParameter("initiative-image");
      Entity initiativeEntity = new Entity("Initiative");
      initiativeEntity.setProperty("title", initiativeTitle);
      initiativeEntity.setProperty("location", initiativeLocation);
      initiativeEntity.setProperty("startDate", initiativeStartDate);
      initiativeEntity.setProperty("endDate", initiativeEndDate);
      initiativeEntity.setProperty("imageUrl", initiativeImageUrl);
      initiativeEntity.setProperty("context", initiativeContext);
      initiativeEntity.setProperty("cause", initiativeCause);
      initiativeEntity.setProperty("targetAudience", initiativeTargetAudience);
      initiativeEntity.setProperty("instructions", initiativeInstructions);
      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(initiativeEntity);
      response.sendRedirect("/createYourOwn.html");
    }
}
