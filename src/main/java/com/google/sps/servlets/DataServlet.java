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

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.gson.Gson;
import com.google.sps.data.Initiative;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String sortBy = request.getHeader("sortBy");
    String startDate = request.getHeader("startDate");
    String endDate = request.getHeader("endDate");

    Query myQuery = new Query();
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    System.out.println("getting headers from GET request");
    System.out.println("sortBy = " + sortBy);
    System.out.println("startDate = " + startDate);
    System.out.println("endDate = " + endDate);
 
    if (startDate.length()==0 && endDate.length()==0) {

      if (sortBy.length() != 0) {
        int index = sortBy.indexOf('_');

        if (sortBy.substring(index+1).equals("START")) {
          if (sortBy.substring(0,index).equals("ASCENDING")) {

            // Sort by StartDate Ascending order
            myQuery = new Query("Initiative").addSort("startDate", SortDirection.ASCENDING);
            System.out.println("Running QUERY 1 !!!!");
          } else {

            // Sort by StartDate Descending order
            myQuery = new Query("Initiative").addSort("startDate", SortDirection.DESCENDING);
            System.out.println("Running QUERY 2 !!!!");
          }
        } else {
          if (sortBy.substring(0,index).equals("ASCENDING")) {

            // Sort by EndDate Ascending order
            myQuery = new Query("Initiative").addSort("endDate", SortDirection.ASCENDING);
            System.out.println("Running QUERY 3 !!!!");
          } else { 

            // Sort by EndDate Descending order
            myQuery = new Query("Initiative").addSort("endDate", SortDirection.DESCENDING);
            System.out.println("Running QUERY 4 !!!!");
          }
        }

      } else {

        // Return ALL in any order --> no sortBy, no startDate, no endDate
        myQuery = new Query("Initiative"); 
        System.out.println("Running QUERY 20 !!!!");
      }

    } else {
      if (startDate.length()!=0){
        if (endDate.length()!=0) {
          if (sortBy.length() != 0) {
            int index = sortBy.indexOf('_');

            if (sortBy.substring(index+1).equals("START")) {
              if (sortBy.substring(0,index).equals("ASCENDING")) {

                /* Filter by start AND end dates
                 * Sort by startDate Ascending order
                 */
                myQuery = new Query("Initiative").setFilter(CompositeFilterOperator.and(
                      FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate), 
                      FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate)))
                  .addSort("startDate", SortDirection.ASCENDING);

                System.out.println("Running QUERY 5 !!!!");
              } else {

                /* Filter by start AND end dates
                 * Sort by startDate Descending order
                 */ 
                myQuery = new Query("Initiative").setFilter(CompositeFilterOperator.and(
                      FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate), 
                      FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate)))
                  .addSort("startDate", SortDirection.DESCENDING);
                System.out.println("Running QUERY 6 !!!!");
              }
            } else {

              if (sortBy.substring(0,index).equals("ASCENDING")) {

                /* Filter by start AND end dates
                 * Sort by endDate Ascending order
                 */
                myQuery = new Query("Initiative").setFilter(CompositeFilterOperator.and(
                      FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate), 
                      FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate)))
                  .addSort("endDate", SortDirection.ASCENDING);
                System.out.println("Running QUERY 7 !!!!");
              } else { 

                /* Filter by start AND end dates
                 * Sort by endDate Descending order
                 */
                myQuery = new Query("Initiative").setFilter(CompositeFilterOperator.and(
                      FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate), 
                      FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate)))
                  .addSort("endDate", SortDirection.DESCENDING);
                System.out.println("Running QUERY 8 !!!!");
              }
            }
          } else {

            // Filter by start AND end dates
            myQuery = new Query("Initiative").setFilter(CompositeFilterOperator.and(
                  FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate), 
                  FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate)));
            System.out.println("Running QUERY 9 !!!!");
          }
        } else {
          if (sortBy.length() != 0) {
            int index = sortBy.indexOf('_');

            if (sortBy.substring(index+1).equals("START")) {
              if (sortBy.substring(0,index).equals("ASCENDING")) {

                // Filter by start date, sort by startDate Ascending order
                myQuery = new Query("Initiative").setFilter(
                    FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate))
                  .addSort("startDate", SortDirection.ASCENDING);
                System.out.println("Running QUERY 10 !!!!");
              } else {

                // filter by start date, sort by startDate Descending order
                myQuery = new Query("Initiative").setFilter(
                    FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate))
                  .addSort("startDate", SortDirection.DESCENDING);
                System.out.println("Running QUERY 11 !!!!");
              }
            } else {

              if (sortBy.substring(0,index).equals("ASCENDING")) {

                // filter by start date, sort by endDate Ascending order
                myQuery = new Query("Initiative").setFilter(
                    FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate))
                  .addSort("endDate", SortDirection.ASCENDING);
                System.out.println("Running QUERY 12 !!!!");
              } else { 

                // filter by start date, sort by endDate Descending order
                myQuery = new Query("Initiative").setFilter(
                    FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate))
                  .addSort("endDate", SortDirection.DESCENDING);
                System.out.println("Running QUERY 13 !!!!");
              }
            }
          } else {

            // filter by start date
            myQuery = new Query("Initiative").setFilter(
                FilterOperator.GREATER_THAN_OR_EQUAL.of("startDate", startDate));
            System.out.println("Running QUERY 14 !!!!");
          }

        }

      } else {

        if (endDate.length()!=0) {
          if (sortBy.length() != 0) {
            int index = sortBy.indexOf('_');

            if (sortBy.substring(index+1).equals("START")) {
              if (sortBy.substring(0,index).equals("ASCENDING")) {

                // filter by end date, sort by startDate Ascending order
                myQuery = new Query("Initiative").setFilter( 
                    FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate))
                  .addSort("startDate", SortDirection.ASCENDING);
                System.out.println("Running QUERY 15 !!!!");
              } else {

                // filter by end date, sort by startDate Descending order
                myQuery = new Query("Initiative").setFilter(
                    FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate))
                  .addSort("startDate", SortDirection.DESCENDING);
                System.out.println("Running QUERY 16 !!!!");
              }
            } else {

              if (sortBy.substring(0,index).equals("ASCENDING")) {

                // filter by end date, sort by endDate Ascending order
                myQuery = new Query("Initiative").setFilter(
                    FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate))
                  .addSort("endDate", SortDirection.ASCENDING);
                System.out.println("Running QUERY 17 !!!!");
              } else { 

                // filter by end date, sort by endDate Descending order
                myQuery = new Query("Initiative").setFilter(
                    FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate))
                  .addSort("endDate", SortDirection.DESCENDING);
                System.out.println("Running QUERY 18 !!!!");
              }
            }
          } else {

            // filter by end date
            myQuery = new Query("Initiative").setFilter(
                FilterOperator.LESS_THAN_OR_EQUAL.of("endDate", endDate));
            System.out.println("Running QUERY 19 !!!!");
          }
        }
      }
    }

    PreparedQuery myResults = datastore.prepare(myQuery);
    String myJson = convertToJsonWithGson(processQueryResult(myResults));
    response.setContentType("application/json;");
    response.getWriter().println(myJson);
  }

  private static List<List<String>> processQueryResult(PreparedQuery result) {
    List<String> titles = new ArrayList<>();
    List<String> locations = new ArrayList<>();
    List<String> startDates = new ArrayList<>();
    List<String> endDates = new ArrayList<>();
    List<String> contexts = new ArrayList<>();
    List<String> causes = new ArrayList<>();
    List<String> audiences = new ArrayList<>();
    List<String> instructions = new ArrayList<>();
    List<String> urls = new ArrayList<>();
    List<List<String>> listOfLists = new ArrayList<>();
    for (Entity entity : result.asIterable()) {
      String currTitle = (String) entity.getProperty("title");
      String currLocation = (String) entity.getProperty("location");
      String currStartDate = (String) entity.getProperty("startDate");
      String currEndDate = (String) entity.getProperty("endDate");
        String currContext = (String) entity.getProperty("context");
        String currCause = (String) entity.getProperty("cause");
        String currAudience = (String) entity.getProperty("targetAudience");
        String currInstructions = (String) entity.getProperty("instructions");
        String currUrl = (String) entity.getProperty("imageUrl");
        titles.add(currTitle);
        locations.add(currLocation);
        startDates.add(currStartDate);
        endDates.add(currEndDate);
        contexts.add(currContext);
        causes.add(currCause);
        audiences.add(currAudience);
        instructions.add(currInstructions);
        urls.add(currUrl);
    }
    listOfLists.add(titles);
    listOfLists.add(locations);
    listOfLists.add(startDates);
    listOfLists.add(endDates);
    listOfLists.add(contexts);
    listOfLists.add(causes);
    listOfLists.add(audiences);
    listOfLists.add(instructions);
    listOfLists.add(urls);
    return listOfLists;
  } 

   private static String convertToJsonWithGson(List<List<String>> arraylist) {
        Gson myGson = new Gson();
        String nowJson = myGson.toJson(arraylist);
        return nowJson;
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
      String initiativeImageUrl = getUploadedFileUrl(request, "initiative-image");
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

    /** Returns a URL that points to the uploaded file, or null if the user didn't upload a file. */
  private String getUploadedFileUrl(HttpServletRequest request, String formInputElementName) {
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get("initiative-image");

    // User submitted form without selecting a file, so we can't get a URL. (dev server)
    if (blobKeys == null || blobKeys.isEmpty()) {
      return null;
    }

    // Our form only contains a single file input, so get the first index.
    BlobKey blobKey = blobKeys.get(0);

    // User submitted the form without selecting a file, so we can't get a URL. (live server)
    BlobInfo blobInfo = new BlobInfoFactory().loadBlobInfo(blobKey);
    if (blobInfo.getSize() == 0) {
      blobstoreService.delete(blobKey);
      return null;
    }

    // We could check the validity of the file here, e.g. to make sure it's an image file
    // https://stackoverflow.com/q/10779564/873165

    // Use ImagesService to get a URL that points to the uploaded file.
    ImagesService imagesService = ImagesServiceFactory.getImagesService();
    ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);
    String url = imagesService.getServingUrl(options);

    // GCS's localhost preview is not actually on localhost,
    // so make the URL relative to the current domain.
    if(url.startsWith("http://localhost:8080/")){
      url = url.replace("http://localhost:8080/", "/");
    }
    return url;
  }
}
