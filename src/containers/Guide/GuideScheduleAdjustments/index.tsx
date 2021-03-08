import React, {FC} from 'react';

import {DocContainer, DocImage} from 'components';

import BlockchainHalted from './BlockchainHalted.png';
import HaltRequested from './HaltRequested.png';
import LastStep from './LastStep.png';
import LongestBlockchain from './LongestBlockchain.png';
import ScheduleAdjustments from './ScheduleAdjustments.png';
import SyncingBlockchains from './SyncingBlockchains.png';

const GuideScheduleAdjustments: FC = () => {
  return (
    <DocContainer className="GuideScheduleAdjustments" title="Schedule Adjustments" lastUpdated="06 Mar 2021">
      <p>
        If any intentional erroneous block is generated by the PV, that block will be recorded on the blockchain as
        digitally signed proof of cheating which would blacklist the offending node from the network. Other network
        related issues causing an early change in PV such as performance issues, unexpectedly dropping offline, etc…
        will not result in a permanent blacklisting for that node as certain network disruptions are expected in a
        distributed peer-to-peer architecture.
      </p>

      <DocImage alt="schedule adjustments" maxWidth={800} src={ScheduleAdjustments} />

      <p>
        If a node has been skipped that node will no longer participate in future voting for the round. This is because
        that node can no longer be deemed as reliable. Also, as nodes vote on whether or not to skip the current PV
        those votes are all weighted equally and not weighted by boost. Votes to skip a certain node can also be cast
        before that node begins validating as PV. This would occur in the instance where a voting node notices that
        another node has gone offline.
      </p>
      <p>
        At the end of each turn the responsibility of PV will transition to the next node in the schedule. When the
        network is operating as expected no special considerations are needed. Each node is only able to sign blocks as
        PV during their scheduled time. Any blocks signed outside that window will be deemed invalid by the network.
      </p>
      <p>
        When a majority of nodes vote to skip the current PV during a turn, all nodes must reach consensus on exactly
        which block the next PV should take over. This is because in the middle of each turn all 19 nodes are not
        guaranteed to be perfectly in sync and may have blockchains of varying length. The process for switching to a
        new PV before the turn has completed is described in detail below.
      </p>
      <p>
        At the beginning of each turn when a new PV takes over, each node will keep an independent record of all
        eligible voting nodes statuses. If a node finds an issue with the PV (performance, error, offline, etc…) the
        node will set its status to <b>halt requested</b> and broadcast that message out to all other nodes.
      </p>

      <DocImage alt="halt requested" maxWidth={900} src={HaltRequested} />

      <p>
        When a majority of halt requests are received from eligible nodes it will trigger the receiving node to halt
        production of their blockchain. After stopping production that node will set its own status to{' '}
        <b>blockchain halted</b> and broadcast that message along with the block number of it’s HEAD block (its last
        block before halting) out to all other nodes.
      </p>

      <DocImage alt="blockchain halted" maxWidth={900} src={BlockchainHalted} />

      <p>
        All nodes will follow similar logic resulting in each node receiving the HEAD block from its peers. When the
        majority of blockchain halted requests have been received the node may begin the syncing process. This involves
        first calculating the longest blockchain.
      </p>

      <DocImage alt="longest blockchain" maxWidth={600} src={LongestBlockchain} />

      <p>
        Once the longest blockchain has been calculated the node may begin syncing their own blockchain up to that
        block.
      </p>

      <DocImage alt="syncing blockchains" maxWidth={700} src={SyncingBlockchains} />

      <p>
        Note that the receiving node only needs a majority of node responses before syncing rather than waiting for all
        nodes to respond. This is because once the majority of responses has been received, all unknown responses would
        be from a minority of peers. It would therefore be impossible for that minority to have any longer blockchain
        given that a majority consensus needs reached in order to append a block to the blockchain which would be
        impossible given the status of the halted nodes where each of their HEAD blocks are known.
      </p>
      <p>
        Once synced, nodes will send out a <b>sync switch</b> request. When the majority of nodes receive this they will
        all switch over to the new PV together.
      </p>

      <DocImage alt="last step" maxWidth={900} src={LastStep} />
    </DocContainer>
  );
};

export default GuideScheduleAdjustments;