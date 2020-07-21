package com.google.sps.data;

public final class Initiative {

    private final String title;
    private final String location;
    private final String startDate;
    private final String endDate;
    private final String imageUrl;
    private final String context;
    private final String cause;
    private final String targetAudience;
    private final String instructions;

    public Initiative(String title, String location, String startDate, String endDate,
     String imageUrl, String context, String cause, String targetAudience, String instructions) {
        this.title = title;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageUrl = imageUrl;
        this.context = context;
        this.cause = cause;
        this.targetAudience = targetAudience;
        this.instructions = instructions;
    }

}
