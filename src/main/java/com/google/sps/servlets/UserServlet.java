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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.gson.Gson;
import com.google.sps.team36.User;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/user")
public class UserServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    String username = request.getParameter("username");
    String password = request.getParameter("password");

    Query query = new Query("user")
      .setFilter(
          CompositeFilterOperator.and(FilterOperator.EQUAL.of("username", username), FilterOperator.EQUAL.of("password", password)));

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery result = datastore.prepare(query);

    if (result.countEntities() == 1) {
      Cookie cookie = new Cookie("user", username);
      Cookie cookieId = new Cookie("id", result.asSingleEntity().getKey().getId() + "");
      response.addCookie(cookie);
      response.addCookie(cookieId);
      response.sendRedirect("/profile.html");
    } else {
      response.sendRedirect("/login.html");
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String username = "";
    long id = (long) 0;

    Cookie cookies[] = request.getCookies();

    for (Cookie c:cookies) {
      if (c.getName().equals("user"))
        username = c.getValue();
      if (c.getName().equals("id")) {
            System.out.println("ID ----> "+ c.getValue());
            id = Long.parseLong(c.getValue());
      }
    }

    Query query = new Query("user").setFilter(
        CompositeFilterOperator.and(FilterOperator.EQUAL.of("username", username), FilterOperator.EQUAL.of(Entity.KEY_RESERVED_PROPERTY, id)));
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery result = datastore.prepare(query);

    Entity person = result.asSingleEntity();

    String name = (String) person.getProperty("name");
    String email = (String) person.getProperty("email");
    String organization = (String) person.getProperty("organization");
    String number = (String) person.getProperty("contactNum");

    User user = new User (username, name, email, number, organization);

    Gson gson = new Gson();

    response.setContentType("application/json; charset=UTF-8");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().println(gson.toJson(user));
  }

}
