export interface RecepieInterface {
title: string;
date: Date ;
imageUrl?: string;
ingredients: [{ingredient?: any}];
procedure: [{procedure?: any}];
}
