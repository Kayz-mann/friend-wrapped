import { useMemo } from "react";
import * as Contacts from 'expo-contacts';

interface ContactEngagement {
  contactId: string;
  messageCount: number;
  lastInteractionDate: Date;
  callDuration: number;
}

export const useContactEngagement = (
  contacts: Contacts.Contact[],
  contactEngagement?: ContactEngagement[]
) => {
    //contact engagement hook to calculate  message count, lastInteractionDate
  const calculateEngagementScore = (contact: Contacts.Contact): number => {
    if (!contactEngagement) return 0;

    const engagement = contactEngagement.find(
      (e) => e.contactId === contact.id
    );

    if (!engagement) return 0;

    const messageScore = engagement.messageCount * 2;
    const recencyScore = engagement.lastInteractionDate
      ? Math.max(
          0,
          100 -
            (new Date().getTime() - engagement.lastInteractionDate.getTime()) /
              (1000 * 60 * 60 * 24)
        )
      : 0;
    const callScore = engagement.callDuration / 60;

    return messageScore + recencyScore + callScore;
  };

  const sortedContacts = useMemo(() => {
    if (!contacts) return [];
    return [...contacts].sort((a, b) => {
      const scoreA = calculateEngagementScore(a);
      const scoreB = calculateEngagementScore(b);
      return scoreB - scoreA; // Descending order
    });
  }, [contacts, contactEngagement]);

  return sortedContacts;
};
