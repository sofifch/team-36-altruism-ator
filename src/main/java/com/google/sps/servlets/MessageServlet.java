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
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.gson.Gson;
import com.google.sps.team36.Message;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/message")
public class MessageServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    Cookie cookies[] = request.getCookies();

    String user = "";
    String user2 = "";

    for (Cookie c:cookies) {
      if (c.getName().equals("user"))
        user = c.getValue();
      if (c.getName().equals("user2"))
        user2 = c.getValue();
    }

    Date timeNow = new Date();
    String message = request.getParameter("message");

    Entity messageEntity = new Entity("message");
    messageEntity.setProperty("sender", user);
    messageEntity.setProperty("receiver", user2);
    messageEntity.setProperty("message", message);
    messageEntity.setProperty("timeStamp", timeNow);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(messageEntity);

    response.sendRedirect("/chat.html");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    
    Cookie cookies[] = request.getCookies();

    String user = "";
    Cookie cookieUser2 = null;

    for (Cookie c:cookies) {
      if (c.getName().equals("user"))
        user = c.getValue();
    }

    Query query = new Query("message");

    PreparedQuery result = datastore.prepare(query);

    List<Message> messageList = new ArrayList<>();

    // if no initial messages in database, create some messages
    if (result.countEntities() == 0) {
      String[] senders = {"test1", "test2", "test1", "test1", "test2"};
      String[] receivers = {"test2", "test1", "test2", "test2", "test1"};
      String[] messages = {"Hello. I am intersted in your event. Could I volunteer?", 
        "Hello. Of course, glad to have you!!", 
        "Great. What are some info that I should aware of?", 
        "Could I bring my friends as well?", 
        "Mark the event date and arrive on time. Yes, we welcome all volunters!"};
      Date[] timeStamps = {new Date(2019, 04, 24, 10, 24), 
        new Date(2019, 04, 24, 10, 34), 
        new Date(2019, 04, 24, 11, 55), 
        new Date(2019, 04, 24, 12, 05), 
        new Date(2019, 04, 27, 8, 0)};

      if (user.equals("test1"))
        cookieUser2 = new Cookie("user2", "test2");
      else 
        cookieUser2 = new Cookie("user2", "test1");

      response.addCookie(cookieUser2);

      for (int i=0; i<senders.length; i++) {
        Entity messageEntity = new Entity("message");
        messageEntity.setProperty("sender", senders[i]);
        messageEntity.setProperty("sender", receivers[i]);
        messageEntity.setProperty("message", messages[i]);
        messageEntity.setProperty("timeStamp", timeStamps[i]);
        datastore.put(messageEntity);
      }
    }

    Query query2 = new Query("message").setFilter(
        CompositeFilterOperator.or(FilterOperator.EQUAL.of("sender", user), FilterOperator.EQUAL.of("receiver", user)))
      .addSort("timeStamp", SortDirection.ASCENDING);

    PreparedQuery results = datastore.prepare(query2);
   
    if (results.countEntities() == 0) {
      response.setContentType("html/text");
      response.getWriter().println("<h3>Empty inbox</h3>");
    } else {
      for (Entity entity : results.asIterable()) {
        String sender = (String) entity.getProperty("sender");
        String receiver = (String) entity.getProperty("receiver");
        String message = (String) entity.getProperty("message");
        String timeStamp = entity.getProperty("timeStamp").toString();
        Message m = new Message (sender, receiver, message, timeStamp);
        messageList.add(m);
      }
      Gson gson = new Gson();
      response.setContentType("application/json; charset=UTF-8");
      response.setCharacterEncoding("UTF-8");
      response.getWriter().println(gson.toJson(messageList));
    }
  }
}
