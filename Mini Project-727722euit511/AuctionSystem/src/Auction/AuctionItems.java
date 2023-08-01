package Auction;

import App.Aucti;

public abstract class AuctionItems {
    private int id;
    private String name;
    private String description;
    private double startingPrice;
    private double currentHighestBid;
    private int highestBidderId;

    public AuctionItems(int id, String name, String description, double startingPrice) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startingPrice = startingPrice;
        this.currentHighestBid = startingPrice;
        this.highestBidderId = 0; // 0 represents no bidder
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getStartingPrice() {
        return startingPrice;
    }

    public double getCurrentHighestBid() {
        return currentHighestBid;
    }

    public int getHighestBidderId() {
        return highestBidderId;
    }

    public void updateHighestBid(double bidAmount, int bidderId) {
        if (bidAmount > currentHighestBid) {
            currentHighestBid = bidAmount;
            highestBidderId = bidderId;
        }
    }
}